import { create } from 'zustand';

export const useCanvasStore = create((set) => ({
    elements: [],
    tool: 'pencil', // pencil | eraser | rectangle | circle | selection
    color: '#000000',
    strokeWidth: 4,
    selectedId: null,
    stickyShape: 'square',
    stickyFont: 'sans-serif',
    isPresenting: false,
    presenterId: null,
    undoManager: null,

    canvasBackground: {
        type: 'pattern', // 'solid' | 'pattern' | 'image'
        value: 'grid',
        opacity: 1,
        color: '#f8fafc'
    },

    setSelectedId: (id) => set({ selectedId: id }),

    setIsPresenting: (status) => set({ isPresenting: status }),

    setPresenterId: (id) => set({ presenterId: id }),

    setStickyShape: (shape) => set({ stickyShape: shape }),

    setStickyFont: (font) => set({ stickyFont: font }),

    setUndoManager: (um) => set({ undoManager: um }),

    setCanvasBackground: (bg) =>
        set((state) => ({
            canvasBackground: { ...state.canvasBackground, ...bg }
        })),

    // Active drawing tool
    setTool: (tool) => set({ tool }),

    // Stroke color
    setColor: (color) => set({ color }),

    // Stroke width
    setStrokeWidth: (width) => set({ strokeWidth: width }),

    // Replace entire canvas elements (used for Yjs sync)
    setElements: (newElements) => set({ elements: newElements }),

    // Add single element safely
    addElement: (element) =>
        set((state) => {
            if (state.elements.some(el => el.id === element.id)) {
                return state;
            }

            return {
                elements: [...state.elements, element]
            };
        }),

    // Add multiple elements safely (AI diagrams etc.)
    addElements: (elementsToAdd) =>
        set((state) => {
            const existingIds = new Set(state.elements.map(el => el.id));

            const filtered = elementsToAdd.filter(
                el => !existingIds.has(el.id)
            );

            return {
                elements: [...state.elements, ...filtered]
            };
        }),

    // Update element (dragging, resizing, editing)
    updateElement: (id, newProps) =>
        set((state) => ({
            elements: state.elements.map((el) =>
                el.id === id ? { ...el, ...newProps } : el
            )
        })),

    // Bring element forward
    bringForward: (id) =>
        set((state) => {
            const index = state.elements.findIndex(el => el.id === id);

            if (index === -1 || index === state.elements.length - 1) {
                return state;
            }

            const newElements = [...state.elements];
            const [element] = newElements.splice(index, 1);
            newElements.push(element);

            return { elements: newElements };
        }),

    // Send element to back
    sendToBack: (id) =>
        set((state) => {
            const index = state.elements.findIndex(el => el.id === id);

            if (index <= 0) return state;

            const newElements = [...state.elements];
            const [element] = newElements.splice(index, 1);
            newElements.unshift(element);

            return { elements: newElements };
        }),

    // Undo
    undo: () =>
        set((state) => {
            if (state.undoManager) {
                state.undoManager.undo();
            }
            return state;
        }),

    // Redo
    redo: () =>
        set((state) => {
            if (state.undoManager) {
                state.undoManager.redo();
            }
            return state;
        }),

    // Clear entire canvas
    clearCanvas: () =>
        set(() => ({
            elements: []
        }))
}));


