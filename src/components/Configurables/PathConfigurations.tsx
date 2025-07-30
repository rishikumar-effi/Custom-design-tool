import { useState, useCallback } from "react";
import styles from './Configurables.module.css';
import useObjectSync from "../../hooks/useObjectSync";

const PathConfigurations = ({ object, handleChange }: { object: any, handleChange: (prop: string | Record<string, number | string>, value?: number | string | Array<number>) => void }) => {
    const [color, setColor] = useState<string>(object ? object.stroke : '#e0e0e0');
    const [strokeWidth, setStrokeWidth] = useState<number>(object ? object.strokeWidth : 0);

    const colorHandler = useCallback((e: any) => {
        const newColor = e.target.value;
        setColor(newColor);

        handleChange('stroke', newColor);
    }, [handleChange]);

    const strokeWidthHandler = useCallback((e: any) => {
        const newStrokeWidth = Number(e.target.value);
        setStrokeWidth(newStrokeWidth);

        handleChange('strokeWidth', newStrokeWidth);
    }, [handleChange]);

    const objectHandler = useCallback(() => {
        const stroke = object.strokeWidth || 0;

        setStrokeWidth(stroke);
        setColor(object.stroke || '#e0e0e0');
    }, [object]);

    useObjectSync(object, objectHandler);

    return <>
        <div className={styles.configurable}>
            <label htmlFor="set-stroke">Stroke Width</label>
            <input type="number" id="set-stroke" name="stroke" min={0} onChange={strokeWidthHandler} value={strokeWidth} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-fill">Stroke Color</label>
            <input type="color" name="fill" id="set-fill" value={color} onChange={colorHandler} />
        </div>
    </>
}

export default PathConfigurations;