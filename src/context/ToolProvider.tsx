import {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useFabricJSEditor } from "fabricjs-react";
import { fabric } from 'fabric';

type customFabricObject = fabric.Object & { id: string };

type customFabricGroup = fabric.Group & { id: string };

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
  highlightObject: (event: any, obj: any) => void;
  importSVG: (svgString: string) => void;
};

export const ToolContext = createContext<ToolContextType | null>(null);

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const { editor, onReady } = useFabricJSEditor();

  const [color, setColor] = useState<string>("#e0e0e0");
  const [objects, setObjects] = useState<fabric.Object[]>([]);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);

  const undoStack = useRef<fabric.Object[]>([]);
  const redoStack = useRef<fabric.Object[]>([]);

  const importSVG = useCallback(async (svgString: string) => {
    if (!editor) return;

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

    svgDoc.querySelectorAll('image').forEach((img) => {
      const href = img.getAttribute('href') || img.getAttribute('xlink:href');
      if (href) {
        img.setAttribute('xlink:href', href);
        img.setAttribute('crossorigin', 'anonymous');
      }
    });

    const serializer = new XMLSerializer();
    const fixedSVGString = serializer.serializeToString(svgDoc);

    fabric.loadSVGFromString(fixedSVGString, (objects: any[]) => {
      if (!objects?.length) return;

      editor.canvas._objects.splice(0, editor.canvas._objects.length);
      editor.canvas.backgroundImage = objects[0];

      const newObj = objects.slice(1);

      newObj.map((object: customFabricObject) => {
        object.set({ id: crypto.randomUUID() });

        if (object.type === 'text') {
          const textObj: any = object;
          const iText = new fabric.Textbox(textObj.text || '', {
            ...textObj.toObject(),
            id: textObj.id,
          });
          return iText;
        }

        return object;
      });

      const group = new fabric.Group(newObj) as customFabricGroup;
      group.set({ id: crypto.randomUUID() });

      editor.canvas.add(group);
      editor.canvas.renderAll();
    });
  }, [editor]);



  const objectProps = useCallback((obj: any) => {
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
    if (!editor || !fabric) return;
    const circle = new fabric.Circle({
      radius: 30,
      fill: color,
      stroke: "#1e2022",
      strokeWidth: 1,
    });
    objectProps(circle);
  }, [editor, color]);

  const addRectangle = useCallback(() => {
    if (!editor || !fabric) return;
    const rect = new fabric.Rect({
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
    if (!editor || !fabric) return;
    const text = new fabric.Textbox("Insert text", {
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

  const highlightObject = useCallback((event: any, obj: customFabricObject) => {
    if (!editor) return;
    event.stopPropagation();

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
    highlightObject,
    importSVG
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
