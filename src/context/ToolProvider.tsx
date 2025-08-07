import {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
} from "react";
import { useFabricJSEditor } from "fabricjs-react";
import { fabric } from 'fabric';

type customFabricObject = fabric.Object & { id: string };

type customFabricGroup = fabric.Group & { id: string, label?: string };

type customPath = fabric.Path & { id: string };

type ToolContextType = {
  addCircle: () => void;
  addRectangle: () => void;
  addLine: () => void,
  addText: () => void;
  onPlaygroundReady: (canvas: fabric.Canvas) => void;
  clearAll: () => void;
  color: string;
  setColor: (color: string) => void;
  objects: fabric.Object[];
  activeObject: any;
  deleteSelected: () => void;
  exportAsSVG: () => string | null;
  highlightObject: (event: any, obj: any) => void;
  importSVG: (svgString: string) => void;
  addBrush: () => void,
  inEditingMode: boolean,
  exitEditingMode: () => void
};

export const ToolContext = createContext<ToolContextType | null>(null);

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const { editor, onReady } = useFabricJSEditor();

  const [color, setColor] = useState<string>("#e0e0e0");
  const [objects, setObjects] = useState<fabric.Object[]>([]);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
  const [inEditingMode, setIsEditingMode] = useState<boolean>(false);

  const exitEditingMode = useCallback(() => { 
    setIsEditingMode(false);
    
    if(editor) editor.canvas.isDrawingMode = false;
  }, [editor, inEditingMode]);

  useEffect(() => setIsEditingMode(editor?.canvas.isDrawingMode ?? false), [editor?.canvas.isDrawingMode, inEditingMode]);

  const objectProps = useCallback((obj: any) => {
    if (!editor) return;
    const canvas = editor.canvas;
    const center = canvas.getCenter();
    canvas.isDrawingMode = false;

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
  }, [editor]);

  const importSVG = useCallback(async (svgString: string) => {
    if (!editor) return;

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
    const center = editor.canvas.getCenter();

    svgDoc.querySelectorAll('image').forEach((img) => {
      const href = img.getAttribute('href') || img.getAttribute('xlink:href');
      if (href) {
        img.setAttribute('xlink:href', href);
        img.setAttribute('crossorigin', 'anonymous');
      }
    });

    const serializer = new XMLSerializer();
    const fixedSVGString = serializer.serializeToString(svgDoc);

    fabric.loadSVGFromString(fixedSVGString, (objects: fabric.Object[]) => {
      if (!objects?.length) return;

      const newObjs = objects.map((object: any) => {
        object.set({ id: crypto.randomUUID() });

        if (object.type === 'text') {
          const textObj = object as fabric.Text;

          return new fabric.Textbox(textObj.text ?? '', {
            ...textObj,
            type: 'textbox',
          });
        }

        return object;
      });

      const group = new fabric.Group(newObjs) as customFabricGroup;

      const scaleTo = .5;

      group.scale(scaleTo);
      group.set({
        label: 'Template', id: crypto.randomUUID(), left: center.left - (group.getScaledWidth() / 2),
        top: center.top - (group.getScaledHeight() / 2),
        subTargetCheck: true
      });
      group.setCoords();
      editor.canvas.add(group);
      editor.canvas.setActiveObject(group);
    });
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

  const addLine = useCallback(() => {
    if (!editor || !fabric) return;

    const line = new fabric.Line([50, 50, 150, 50], {
      selectable: true,
      hasControls: true,
      hasBorders: true,
      stroke: "#e0e0e0",
      strokeWidth: 1,
      // strokeLineCap: 'round',
      strokeDashArray: [1, 0]
    });

    objectProps(line);
  }, [editor]);

  const addText = useCallback(() => {
    if (!editor || !fabric) return;
    const text = new fabric.Textbox("Insert text", {
      left: 100,
      top: 100,
      fill: color,
    });
    objectProps(text);
  }, [editor, color]);

  const addBrush = useCallback(() => {
    if (!editor || !fabric) return;

    const canvas = editor.canvas;

    canvas.isDrawingMode = true;
    setIsEditingMode(true);

    canvas.freeDrawingBrush.color = "#1e2022";
    canvas.freeDrawingBrush.width = 2;

    const handlePathCreated = (e: any) => {
      const path = e.path as customPath;
      path.set({ id: crypto.randomUUID() });
      path.setCoords();
    };

    canvas.off('path:created', handlePathCreated);
    canvas.on('path:created', handlePathCreated);
  }, [editor]);

  const deleteSelected = useCallback(() => {
    if (!editor) return;
    const canvas = editor.canvas;

    const activeObjects = canvas.getActiveObjects();

    if (!activeObjects.length) return;

    const activeObjectType = canvas.getActiveObject()?.type;

    if (activeObjects.length) {
      activeObjects.forEach((obj: fabric.Object) => {
        const isBelongsToGroup = obj.hasOwnProperty('group') && activeObjectType && activeObjectType !== 'activeSelection';

        !isBelongsToGroup && canvas.remove(obj);

        if (isBelongsToGroup) {
          const group = obj.group as customFabricGroup;

          const remainingObjects = group._objects.filter((obj) => obj !== activeObject);

          group._restoreObjectsState();
          canvas.remove(group);

          if (group._objects.length > 1) {
            const newGroup = new fabric.Group(remainingObjects) as customFabricGroup;

            newGroup.set({ id: crypto.randomUUID(), label: 'Template' });

            canvas.add(newGroup);
          }
        }
      });

      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  }, [editor, activeObject]);

  const clearAll = useCallback(() => {
    if (!editor) return;
    editor.canvas.clear();
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

    const selectingGroupObject = (opt: any) => {
      const target = opt.target;

      if (target?.type === 'group') {

        const group = target as fabric.Group;

        group._restoreObjectsState();
        editor.canvas.remove(group);

        group.getObjects().forEach((obj) => {
          editor.canvas.add(obj);
        });

        editor.canvas.requestRenderAll();
      }
    }

    const deleteObjectsOnKeyDown = (event: KeyboardEvent) => {
      if(event.key !== 'Delete') return;
      deleteSelected();
    }

    document.addEventListener('keydown', deleteObjectsOnKeyDown);
    canvas.on('mouse:dblclick', selectingGroupObject);
    canvas.on("object:added", updateObjects);
    canvas.on("object:removed", updateObjects);
    canvas.on("object:modified", updateObjects);
    canvas.on("selection:created", updateSelection);
    canvas.on("selection:updated", updateSelection);
    canvas.on("selection:cleared", () => setActiveObject(null));

    return () => {
      document.removeEventListener('keydown', deleteObjectsOnKeyDown);
      canvas.off('mouse:dblclick', selectingGroupObject);
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
    addLine,
    addText,
    onPlaygroundReady: onReady,
    clearAll,
    color,
    setColor,
    objects,
    activeObject,
    deleteSelected,
    exportAsSVG,
    highlightObject,
    importSVG,
    addBrush,
    inEditingMode,
    exitEditingMode
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
