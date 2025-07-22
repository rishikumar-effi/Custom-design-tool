import { useState, useCallback } from "react";
import styles from './Configurables.module.css';
import useObjectSync from "../../hooks/useObjectSync";

const TextConfigurations = ({ object, handleChange }: { object: any, handleChange: (prop: string | Record<string, number | string>, value?: number | string) => void }) => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [color, setColor] = useState<string>(object ? object.fill : '#e0e0e0');
    const [text, setText] = useState<string>(object ? object.text : 'Insert Text');

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

    const colorHandler = useCallback((e: any) => {
        const newColor = e.target.value;
        setColor(newColor);

        handleChange('fill', newColor);
    }, [handleChange]);

    const textHandler = useCallback((e: any) => {
        const newText = e.target.value;

        setText(newText);

        handleChange('text', newText);
    }, [handleChange]);

    const objectHandler = useCallback(() => {
        const actualWidth = Math.round((object.width || 0) * (object.scaleX || 1));
        const actualHeight = Math.round((object.height || 0) * (object.scaleY || 1));

        setWidth(actualWidth);
        setHeight(actualHeight);
        setColor(object.fill || '#e0e0e0');
        setText(object.text || 'Insert Text');
    }, []);

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
            <label htmlFor="set-fill">Fill</label>
            <input type="color" name="fill" id="set-fill" value={color} onChange={colorHandler} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-text">Text</label>
            <input type="text" id="set-text" name="text" value={text} onChange={textHandler} />
        </div>
    </>
}

export default TextConfigurations;