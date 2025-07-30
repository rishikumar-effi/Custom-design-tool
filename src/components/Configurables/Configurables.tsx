import { useCallback } from "react";
import CircleConfigurations from "./CircleConfigurations";
import RectangleConfigurations from "./RectangleConfigurations";
import TextConfigurations from "./TextConfigurations";
import styles from './Configurables.module.css';
import LineConfigurations from "./LineConfigurations";

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

    const renderConfiguration = () => {
        if (!activeObject) return null;

        switch (activeObject.type) {
            case 'circle':
                return <CircleConfigurations object={activeObject} handleChange={handleChange} />;
            case 'rect':
                return <RectangleConfigurations object={activeObject} handleChange={handleChange} />;
            case 'textbox':
                return <TextConfigurations object={activeObject} handleChange={handleChange} />;
            case 'line':
                return <LineConfigurations object={activeObject} handleChange={handleChange} />;
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