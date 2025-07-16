import {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useFabricJSEditor } from "fabricjs-react";
import fabric from "fabric";

declare global {
  interface Window {
    fabric: typeof import("fabric");
  }
}

type ToolContextType = {
  addCircle: () => void;
  addRectangle: () => void;
  addText: () => void;
  onPlaygroundReady: (canvas: fabric.Canvas) => void;
  undo: () => void;
  redo: () => void;
  clearAll: () => void;
  color: string;
  setColor: (color: string) => void;
  objects: fabric.Object[];
  activeObject: fabric.Object | null;
  setActiveObject: (obj: fabric.Object | null) => void;
  deleteSelected: () => void;
  redoStack: any;
  exportAsSVG: () => string | null;
};

export const ToolContext = createContext<ToolContextType | null>(null);

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const { editor, onReady } = useFabricJSEditor();

  const [color, setColor] = useState<string>("#e0e0e0");
  const [cropImage] = useState<boolean>(true);
  const [objects, setObjects] = useState<fabric.Object[]>([]);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);

  const undoStack = useRef<fabric.Object[]>([]);
  const redoStack = useRef<fabric.Object[]>([]);

  useEffect(() => {
    // console.log(activeObject);
  }, [activeObject]);

  const addCircle = useCallback(() => {
    if (!editor || !window.fabric) return;
    const circle = new window.fabric.Circle({
      radius: 30,
      fill: color,
      left: 100,
      top: 100,
      stroke: "rgb(30,32,34)",
      strokeWidth: 1,
    });
    editor.canvas.add(circle);
    editor.canvas.setActiveObject(circle);
    redoStack.current = [];
  }, [editor, color]);

  const addRectangle = useCallback(() => {
    if (!editor || !window.fabric) return;
    const rect = new window.fabric.Rect({
      width: 60,
      height: 40,
      fill: color,
      left: 100,
      top: 100,
      stroke: "rgb(30,32,34)",
      strokeWidth: 1,
    });
    editor.canvas.add(rect);
    editor.canvas.setActiveObject(rect);
    redoStack.current = [];
  }, [editor, color]);

  const addText = useCallback(() => {
    if (!editor || !window.fabric) return;
    const text = new window.fabric.IText("Insert text", {
      left: 100,
      top: 100,
      fill: color,
    });
    editor.canvas.add(text);
    editor.canvas.setActiveObject(text);
    redoStack.current = [];
  }, [editor, color]);

  const undo = useCallback(() => {
    if (!editor) return;
    const objs = editor.canvas.getObjects();
    if (objs.length > 0) {
      const last = objs[objs.length - 1];
      redoStack.current.push(last);
      editor.canvas.remove(last);
      editor.canvas.renderAll();
    }
  }, [editor]);

  const redo = useCallback(() => {
    if (!editor) return;
    const last = redoStack.current.pop();
    if (last) {
      editor.canvas.add(last);
      editor.canvas.renderAll();
    }
  }, [editor]);

  const deleteSelected = () => {
    if (!editor) return;
    const canvas = editor.canvas;

    const activeObjects = canvas.getActiveObjects();

    if (activeObjects.length) {
      activeObjects.forEach((obj: fabric.Object) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  const clearAll = useCallback(() => {
    if (!editor) return;
    editor.canvas.clear();
    undoStack.current = [];
    redoStack.current = [];
    setObjects([]);
    setActiveObject(null);
  }, [editor]);

  const exportAsSVG = useCallback((): string | null => {
    if (!editor) return null;
    return editor.canvas.toSVG();
  }, [editor]);

  useEffect(() => {
    if (!editor || !window.fabric) return;
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [editor, color]);

  // Setup zoom and pan
  useEffect(() => {
    if (!editor || !window.fabric) return;
    const canvas = editor.canvas as any;

    if (cropImage) {
      canvas.__eventListeners = {};
      return;
    }

    if (!canvas.__eventListeners["mouse:wheel"]) {
      canvas.on("mouse:wheel", (opt: any) => {
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        zoom = Math.min(20, Math.max(0.01, zoom));
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }

    if (!canvas.__eventListeners["mouse:down"]) {
      canvas.on("mouse:down", function (this: typeof canvas, opt: any) {
        const evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!canvas.__eventListeners["mouse:move"]) {
      canvas.on("mouse:move", function (this: typeof canvas, opt: any) {
        if (this.isDragging) {
          const e = opt.e;
          const vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }

    if (!canvas.__eventListeners["mouse:up"]) {
      canvas.on("mouse:up", function (this: typeof canvas) {
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }

    canvas.renderAll();
  }, [editor, cropImage]);

  // Sync `objects` and `activeObject` from canvas
  useEffect(() => {
    if (!editor) return;
    const canvas = editor.canvas;

    const updateObjects = () => {
      setObjects(canvas.getObjects().slice());
    };

    const updateSelection = () => {
      setActiveObject(canvas.getActiveObject());
    };

    canvas.on("object:added", updateObjects);
    canvas.on("object:removed", updateObjects);
    canvas.on("object:modified", updateObjects);
    canvas.on("selection:created", updateSelection);
    canvas.on("selection:updated", updateSelection);
    canvas.on("selection:cleared", () => setActiveObject(null));

    return () => {
      canvas.off("object:added", updateObjects);
      canvas.off("object:removed", updateObjects);
      canvas.off("object:modified", updateObjects);
      canvas.off("selection:created", updateSelection);
      canvas.off("selection:updated", updateSelection);
      canvas.off("selection:cleared", () => setActiveObject(null));
    };
  }, [editor]);

  const values: ToolContextType = {
    addCircle,
    addRectangle,
    addText,
    onPlaygroundReady: onReady,
    undo,
    redo,
    clearAll,
    color,
    setColor,
    objects,
    activeObject,
    setActiveObject,
    deleteSelected,
    redoStack,
    exportAsSVG,
  };

  return <ToolContext.Provider value={values}>{children}</ToolContext.Provider>;
};

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("useTool must be used within ToolProvider");
  }
  return context;
};
