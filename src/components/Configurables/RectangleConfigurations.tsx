import { useState, useCallback } from "react";
import styles from './Configurables.module.css';
import useObjectSync from "../../hooks/useObjectSync";

const RectangleConfigurations = ({ object, handleChange }: { object: any, handleChange: (prop: string | Record<string, number | string>, value?: number | string) => void }) => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [fill, setFill] = useState<string>(object ? object.fill : '#e0e0e0');
    const [strokeWidth, setStrokeWidth] = useState<number>(object ? object.strokeWidth : 1);

    const widthHandler = useCallback((e: any) => {
        const newWidth = Number(e.target.value);
        setWidth(newWidth);

        handleChange({ width: newWidth, scaleX: 1 });
    }, [handleChange]);

    const heightHandler = useCallback((e: any) => {
        const newHeight = Number(e.target.value);
        setHeight(newHeight);

        handleChange({ height: newHeight, scaleY: 1 });
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
        const actualWidth = Math.round((object.width || 0) * (object.scaleX || 1));
        const actualHeight = Math.round((object.height || 0) * (object.scaleY || 1));

        setWidth(actualWidth);
        setHeight(actualHeight);
        setFill(object.fill || '#e0e0e0');
        setStrokeWidth(object.strokeWidth || 1);
    }, [object]);

    useObjectSync(object, objectHandler);

    return <>
        <div className={styles.configurable}>
            <label htmlFor="set-width">Width</label>
            <input onChange={widthHandler} type="number" min={0} id="set-width" name="width" value={width} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-height">Height</label>
            <input onChange={heightHandler} min={0} type="number" id="set-height" name="height" value={height} />
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

export default RectangleConfigurations;