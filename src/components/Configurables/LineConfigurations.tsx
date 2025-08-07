import { useState, useCallback } from "react";
import styles from './Configurables.module.css';
import useObjectSync from "../../hooks/useObjectSync";

const LineConfigurations = ({ object, handleChange }: { object: any, handleChange: (prop: string | Record<string, number | string>, value?: number | string | Array<number>) => void }) => {
    const [color, setColor] = useState<string>(object ? object.stroke : '#e0e0e0');
    const [strokeWidth, setStrokeWidth] = useState<number>(object ? object.strokeWidth : 0);
    const [strokeLength, setStrokeLength] = useState(object ? object?.strokeDashArray[0] : 0);
    const [strokeGap, setStrokeGap] = useState(object ? object?.strokeDashArray[0] : 0);

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

    const strokeLengthHandler = useCallback((e: any) => {
        const newStrokeLength = Number(e.target.value);
        setStrokeLength(newStrokeLength);

        handleChange('strokeDashArray', [newStrokeLength, strokeGap]);
    }, [handleChange, strokeGap]);

    const strokeGapHandler = useCallback((e: any) => {
        const newStrokeGap = Number(e.target.value);
        setStrokeGap(newStrokeGap);

        handleChange('strokeDashArray', [strokeLength, newStrokeGap]);
    }, [handleChange, strokeLength]);

    const objectHandler = useCallback(() => {
        const stroke = object.strokeWidth || 0;
        const [newStrokeLength, newStrokeGap] = object.strokeDashArray || [0, 0];

        setStrokeWidth(stroke);
        setStrokeLength(newStrokeLength);
        setStrokeGap(newStrokeGap);
        setColor(object.stroke || '#e0e0e0');
    }, [object]);

    useObjectSync(object, objectHandler);

    return <>
    <div className={styles.configurable}>
            <label htmlFor="set-stroke">Stroke Width</label>
            <input type="number" id="set-stroke" name="stroke" min={0} onChange={strokeWidthHandler} value={strokeWidth} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-stroke-length">Stroke Line Length</label>
            <input type="number" id="set-stroke-length" name="stroke-length" min={0} onChange={strokeLengthHandler} value={strokeLength} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-stroke-gap">Stroke Line Gap</label>
            <input type="number" id="set-stroke-gap" name="stroke-gap" min={0} onChange={strokeGapHandler} value={strokeGap} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-fill">Stroke Color</label>
            <input type="color" name="fill" id="set-fill" value={color} onChange={colorHandler} />
        </div>
    </>
}

export default LineConfigurations;