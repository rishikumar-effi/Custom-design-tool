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
  activeObject: any;
  deleteSelected: () => void;
  redoStack: any;
  exportAsSVG: () => string | null;
  highlightObject: (obj: any) => void;
};

export const ToolContext = createContext<ToolContextType | null>(null);

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const { editor, onReady } = useFabricJSEditor();

  const [color, setColor] = useState<string>("#e0e0e0");
  const [objects, setObjects] = useState<fabric.Object[]>([]);
  const [activeObject, setActiveObject] = useState(null);

  const undoStack = useRef<fabric.Object[]>([]);
  const redoStack = useRef<fabric.Object[]>([]);

  const objectProps = useCallback((obj: fabric.Object) => {
    if (!editor) return;
    const canvas = editor.canvas;
    const center = canvas.getCenter();

    obj.set({
      id: crypto.randomUUID(),
      left: center.left - obj.getScaledWidth() / 2,
      top: center.top - obj.getScaledHeight() / 2,
      originX: 'left',
      originY: 'top'
    });
    obj.setCoords();
    editor.canvas.add(obj);
    editor.canvas.setActiveObject(obj);
    redoStack.current = [];
  }, [editor]);

  const addCircle = useCallback(() => {
    if (!editor || !window.fabric) return;
    const circle = new window.fabric.Circle({
      radius: 30,
      fill: color,
      stroke: "#1e2022",
      strokeWidth: 1,
    });
    objectProps(circle);
  }, [editor, color]);

  const addRectangle = useCallback(() => {
    if (!editor || !window.fabric) return;
    const rect = new window.fabric.Rect({
      width: 60,
      height: 40,
      fill: color,
      left: 100,
      top: 100,
      stroke: "#1e2022",
      strokeWidth: 1,
    });
    objectProps(rect);
  }, [editor, color]);

  const addText = useCallback(() => {
    if (!editor || !window.fabric) return;
    const text = new window.fabric.IText("Insert text", {
      left: 100,
      top: 100,
      fill: color,
    });
    objectProps(text);
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

  const deleteSelected = useCallback(() => {
    if (!editor) return;
    const canvas = editor.canvas;

    const activeObjects = canvas.getActiveObjects();

    if (activeObjects.length) {
      activeObjects.forEach((obj: fabric.Object) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  }, [editor]);

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

  const highlightObject = useCallback((obj: any) => {
    if (!editor) return;
    const canvas = editor.canvas;

    if (obj) {
      canvas.setActiveObject(obj);
    } else {
      canvas.discardActiveObject();
    }

    canvas.requestRenderAll();
    setActiveObject(obj);
  }, [editor]);

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
    deleteSelected,
    redoStack,
    exportAsSVG,
    highlightObject
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
