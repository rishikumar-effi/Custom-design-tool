import { useState, useCallback } from "react";
import styles from './Configurables.module.css';
import useObjectSync from "../../hooks/useObjectSync";

const CircleConfigurations = ({ object, handleChange }: { object: any, handleChange: (prop: string | Record<string, number | string>, value?: number | string) => void }) => {
    const [radius, setRadius] = useState<number>(object ? object.radius : 0);
    const [fill, setFill] = useState<string>(object ? object.fill : '#e0e0e0');
    const [strokeWidth, setStrokeWidth] = useState<number>(object ? object.strokeWidth : 1);

    const radiusHandler = useCallback((e: any) => {
        const newRadius = Number(e.target.value);
        setRadius(newRadius);

        handleChange({ radius: newRadius, scaleX: 1, scaleY: 1 });
    }, [handleChange]);

    const fillHandler = useCallback((e: any) => {
        const newFill = e.target.value;
        setFill(newFill);

        handleChange('fill', newFill);
    }, [handleChange]);

    const strokeWidthHandler = useCallback((e: any) => {
        const newStrokeWidth = Number(e.target.value);
        setStrokeWidth(newStrokeWidth);

        handleChange('strokeWidth', newStrokeWidth);
    }, [handleChange]);

    const objectHandler = useCallback(() => {
        const scaledRadius = Math.round((object.radius || 0) * (object.scaleX || 1));
        const stroke = object.strokeWidth || 1;
        const fill = object.fill || "#e0e0e0";

        setRadius(scaledRadius);
        setFill(fill);
        setStrokeWidth(stroke);
    }, [object]);

    useObjectSync(object, objectHandler);

    return <>
        <div className={styles.configurable}>
            <label htmlFor="set-radius">Radius</label>
            <input onChange={radiusHandler} type="number" min={0} id="set-radius" name="radius" value={radius} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-stroke">Stroke Width</label>
            <input type="number" id="set-stroke" name="stroke" min={0} onChange={strokeWidthHandler} value={strokeWidth} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-fill">Fill</label>
            <input type="color" name="fill" id="set-fill" value={fill} onChange={fillHandler} />
        </div>
    </>
}

export default CircleConfigurations;