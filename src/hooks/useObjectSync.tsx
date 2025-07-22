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

        canvas.on('object:modified', handleModified);

        return () => canvas.off('object:modified', handleModified);
    }, [object, objectHandler]);
}

export default useObjectSync;