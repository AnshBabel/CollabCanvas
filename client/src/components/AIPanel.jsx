
import React, { useState, useRef } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import api from "../services/api";
import { useCanvasStore } from "../store/canvasStore";

function AIPanel({ yDoc, isOpen, setIsOpen }) {


  const { addElements } = useCanvasStore();

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const isLocalUpdate = useRef(false);

  const handleGenerate = async (e, type = "diagram") => {
    if (e) e.preventDefault();
    if (!prompt.trim() || !yDoc) return;

    setIsGenerating(true);
    setError(null);

    try {
      const startX = window.innerWidth / 2 - 200;
      const startY = window.innerHeight / 2 - 200;

      const endpoint =
        type === "brainstorm"
          ? "/ai/brainstorm"
          : "/ai/diagram";

      const response = await api.post(endpoint, {
        prompt,
        startX,
        startY,
      });

      const newElements =
        type === "brainstorm"
          ? response.data?.stickies
          : response.data?.elements;

      if (!newElements || !Array.isArray(newElements)) {
        throw new Error("AI returned no usable elements.");
      }

      const mappedElements = newElements.map((el) => ({
        ...el,
        id: el.id || crypto.randomUUID(),
        isFinished: true,
      }));

      // Sync with Yjs
      isLocalUpdate.current = true;

      yDoc.transact(() => {
        const elementsMap = yDoc.getMap("elements");
        const orderArray = yDoc.getArray("order");

        mappedElements.forEach((el) => {
          elementsMap.set(el.id, el);
          orderArray.push([el.id]);
        });
      });

      // update local store
      addElements(mappedElements);

      setTimeout(() => {
        isLocalUpdate.current = false;
      }, 100);

      setPrompt("");
      setIsOpen(false);
    } catch (err) {
      console.error("AI generation failed:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "AI generation failed."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-4 top-20 w-80 bg-white shadow-lg rounded-xl p-4 border z-50">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={18} />
        <h2 className="font-semibold text-lg">AI Assistant</h2>
      </div>

      <textarea
        className="w-full border rounded-lg p-2 text-sm resize-none"
        rows={4}
        placeholder="Describe the diagram you want..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {error && (
        <div className="text-red-500 text-xs mt-2">
          {error}
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button
          onClick={(e) => handleGenerate(e, "diagram")}
          disabled={isGenerating}
          className="flex-1 bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            "Generate Diagram"
          )}
        </button>

        <button
          onClick={(e) => handleGenerate(e, "brainstorm")}
          disabled={isGenerating}
          className="flex-1 border py-2 rounded-lg"
        >
          Brainstorm
        </button>
      </div>
    </div>
  );
}
export default AIPanel;

