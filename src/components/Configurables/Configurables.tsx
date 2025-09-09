import { useCallback } from "react";
import CircleConfigurations from "./CircleConfigurations";
import RectangleConfigurations from "./RectangleConfigurations";
import TextConfigurations from "./TextConfigurations";
import styles from './Configurables.module.css';
import LineConfigurations from "./LineConfigurations";
import PathConfigurations from "./PathConfigurations";
import { fabric } from 'fabric';

const Configurables = ({ activeObject }: { activeObject: any }) => {
    const handleChange = useCallback((prop: string | Record<string, number | string>, value?: number | string | Array<number>) => {
        if (!activeObject || !activeObject.canvas) return;

        if (typeof prop === 'string') {
            activeObject.set({ [prop]: value });
        } else {
            activeObject.set(prop);
        }

        activeObject.setCoords?.();
        activeObject.canvas?.requestRenderAll();
    }, [activeObject]);

    const fillWithImage = useCallback((file: any) => {
        const reader = new FileReader();

        const fileName = file.name || "Image";

        reader.onload = (e) => {
            const base64 = e.target?.result as string;

            fabric.Image.fromURL(base64, (image) => {
                const canvas = activeObject.canvas;

                if (!canvas) return;

                const clipShape = fabric.util.object.clone(activeObject);

                clipShape.set({ absolutePositioned: true });

                image.set({
                    left: activeObject.left,
                    top: activeObject.top,
                    selectable: true,
                    hasControls: true,
                    clipPath: activeObject,
                }) as fabric.Image;

                activeObject.set({ absolutePositioned: true });

                (image as any).id = crypto.randomUUID();
                (image as any).label = fileName;

                activeObject.set({label: `${fileName}'s Frame`})
                canvas.add(image);
                canvas.setActiveObject(image);
                canvas.requestRenderAll();
            });
        }
        reader.readAsDataURL(file);

    }, [activeObject]);

    const renderConfiguration = () => {
        if (!activeObject) return null;

        switch (activeObject.type) {
            case 'circle':
                return <CircleConfigurations object={activeObject} handleChange={handleChange} fillWithImage={fillWithImage} />;
            case 'rect':
                return <RectangleConfigurations object={activeObject} handleChange={handleChange} fillWithImage={fillWithImage} />;
            case 'textbox':
                return <TextConfigurations object={activeObject} handleChange={handleChange} />;
            case 'line':
                return <LineConfigurations object={activeObject} handleChange={handleChange} />;
            case 'path':
                return <PathConfigurations object={activeObject} handleChange={handleChange} />;
            default:
                return <p>No configurator available</p>
        }
    }

    return <div className={styles.configurables}>
        <fieldset>
            <legend>Configure</legend>
            <section>
                {activeObject ? renderConfiguration() : <p className={styles['placeholder-text']}>Select an object to configure its properties</p>}
            </section>
        </fieldset>
    </div>;
}

export default Configurables;