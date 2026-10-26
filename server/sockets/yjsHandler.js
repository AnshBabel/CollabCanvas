import { WebSocketServer } from "ws";
import * as Y from "yjs";
import * as WebSocketUtils from "y-websocket/bin/utils";
import Room from "../models/Room.js";

const { setupWSConnection, docs } = WebSocketUtils;

export const setupYjs = (server) => {
    const wss = new WebSocketServer({ noServer: true });

    server.on("upgrade", (request, socket, head) => {
        try {
            const { pathname } = new URL(request.url, `http://${request.headers.host}`);

            if (pathname.startsWith("/yjs")) {
                wss.handleUpgrade(request, socket, head, (ws) => {
                    wss.emit("connection", ws, request);
                });
            }
        } catch (err) {
            console.error("[Yjs] Upgrade error:", err);
            socket.destroy();
        }
    });

    wss.on("connection", (conn, req) => {
        try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const roomName = url.pathname.split("/").pop();

            if (!roomName) {
                console.error("[Yjs] Invalid room name");
                conn.close();
                return;
            }

            setupWSConnection(conn, req, { docName: roomName, docs });

            const doc = docs.get(roomName);
            if (!doc) return;

            const metaMap = doc.getMap("meta");
            const elementsMap = doc.getMap("elements");

            if (!metaMap.get("hydrated")) {
                metaMap.set("hydrated", true);

                (async () => {
                    try {
                        const room = await Room.findOne({ roomId: roomName.toUpperCase() });

                        if (room && room.yjsState) {
                            Y.applyUpdate(doc, room.yjsState);
                            console.log(`[Yjs] Hydrated room ${roomName}`);
                        }
                    } catch (err) {
                        console.error(`[Yjs] Hydration error for ${roomName}:`, err);
                    }
                })();
            }

            let saveTimeout = null;

            doc.on("update", () => {
                if (saveTimeout) clearTimeout(saveTimeout);

                saveTimeout = setTimeout(async () => {
                    try {
                        const binaryState = Y.encodeStateAsUpdate(doc);

                        const canvasState = Array.from(elementsMap.values());

                        await Room.findOneAndUpdate(
                            { roomId: roomName.toUpperCase() },
                            {
                                yjsState: Buffer.from(binaryState),
                                canvasState
                            },
                            { upsert: true }
                        );

                        console.log(`[Yjs] State saved for room ${roomName}`);
                    } catch (err) {
                        console.error(`[Yjs] Save error for ${roomName}:`, err);
                    }
                }, 3000);
            });

            console.log(`[Yjs] Connected to room: ${roomName}`);

        } catch (err) {
            console.error("[Yjs] Connection error:", err);
        }
    });

    console.log("✅ Yjs WebSocket server initialized");

    return wss;
};