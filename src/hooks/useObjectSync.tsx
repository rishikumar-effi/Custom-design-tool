import { useEffect } from "react"

const useObjectSync = (object: any, objectHandler: () => void) => {
    useEffect(() => {
        if (!object || !object.canvas) return;

        const canvas = object.canvas;

        objectHandler();

        const handleModified = () => {
            if (canvas.getActiveObject() === object) {
                objectHandler();
            }
        };

        const handleTextChanged = (e: any) => {
            if (e.target === object) {
                objectHandler();
            }
        };

        canvas.on('object:modified', handleModified);
        canvas.on('text:changed', handleTextChanged);

        return () => {
            canvas.off('object:modified', handleModified);
            canvas.off('text:changed', handleTextChanged);
        };
    }, [object, objectHandler]);
}

export default useObjectSync;