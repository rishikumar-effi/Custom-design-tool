import { useState, useCallback } from "react";
import styles from './Configurables.module.css';
import useObjectSync from "../../hooks/useObjectSync";

const CircleConfigurations = ({ object, handleChange }: { object: any, handleChange: (prop: string | Record<string, number | string>, value?: number | string) => void }) => {
    const [fill, setFill] = useState<string>(object ? object.fill : '#e0e0e0');
    const [strokeColor, setStrokeColor] = useState(object ? object.stroke: '#1e2022ff');
    const [strokeWidth, setStrokeWidth] = useState<number>(object ? object.strokeWidth : 1);

    const fillHandler = useCallback((e: any) => {
        const newFill = e.target.value;
        setFill(newFill);

        handleChange('fill', newFill);
    }, [handleChange]);

    const strokeColorHandler = useCallback((e: any) => {
        const newStrokeColor = e.target.value;
        setStrokeColor(newStrokeColor);

        handleChange('stroke', newStrokeColor);
    }, [handleChange]);

    const strokeWidthHandler = useCallback((e: any) => {
        const newStrokeWidth = Number(e.target.value);
        setStrokeWidth(newStrokeWidth);

        handleChange('strokeWidth', newStrokeWidth);
    }, [handleChange]);

    const objectHandler = useCallback(() => {
        const stroke = object.strokeWidth || 1;
        const fill = object.fill || "#e0e0e0";
        const strokeColor = object.stroke || '#1e2122';

        setFill(fill);
        setStrokeWidth(stroke);
        setStrokeColor(strokeColor);
    }, [object]);

    useObjectSync(object, objectHandler);

    return <>
        <div className={styles.configurable}>
            <label htmlFor="set-stroke">Stroke Width</label>
            <input type="number" id="set-stroke" name="stroke" min={0} onChange={strokeWidthHandler} value={strokeWidth} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-stroke-color">Stroke Color</label>
            <input type="color" name="stroke-color" id="set-stroke-color" value={strokeColor} onChange={strokeColorHandler} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-fill">Fill</label>
            <input type="color" name="fill" id="set-fill" value={fill} onChange={fillHandler} />
        </div>
    </>
}

export default CircleConfigurations;