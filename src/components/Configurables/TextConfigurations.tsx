import { useState, useCallback } from "react";
import styles from './Configurables.module.css';
import useObjectSync from "../../hooks/useObjectSync";

const TextConfigurations = ({ object, handleChange }: { object: any, handleChange: (prop: string | Record<string, number | string>, value?: number | string) => void }) => {
    const [color, setColor] = useState<string>(object ? object.fill : '#e0e0e0');
    const [text, setText] = useState<string>(object ? object.text : 'Insert Text');
    const [fontSize, setFontSize] = useState<number>(object ? object.fontSize : 0);

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

    const fontSizeHandler = useCallback((e: any) => {
        const newFontSize = e.target.value;

        setFontSize(newFontSize);

        handleChange('fontSize', newFontSize);
    }, [handleChange]);

    const objectHandler = useCallback(() => {
        setColor(object.fill || '#e0e0e0');
        setText(object.text || 'Insert Text');
        setFontSize(object.fontSize || 0);
    }, [object]);

    useObjectSync(object, objectHandler);

    return <>
        <div className={styles.configurable}>
            <label htmlFor="set-fontsize">Font Size</label>
            <input onChange={fontSizeHandler} min={0} type="number" id="set-fontsize" name="font size" value={fontSize} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-fill">Color</label>
            <input type="color" name="fill" id="set-fill" value={color} onChange={colorHandler} />
        </div>
        <div className={styles.configurable}>
            <label htmlFor="set-text">Text</label>
            <input type="text" id="set-text" name="text" value={text} onChange={textHandler} />
        </div>
        {/* <div className={styles['configurable-wrapper']}>
            <label>Align</label>
            <div className={styles.configurable}>
                <label htmlFor="align-left" className={styles['configurable-icon']}>
                    <IconButton><Icon><LeftAlign/></Icon></IconButton>
                </label>
                <input type="radio" name="align" id="align-left" />
            </div>
            <div className={styles.configurable}>
                <label htmlFor="align-center" className={styles['configurable-icon']}>
                    <IconButton><Icon><CenterAlign/></Icon></IconButton>
                </label>
                <input type="radio" name="align" id="align-center" />
            </div>
            <div className={styles.configurable}>
                <label htmlFor="align-right" className={styles['configurable-icon']}>
                    <IconButton><Icon><RightAlign/></Icon></IconButton>
                </label>
                <input type="radio" name="align" id="align-right" />
            </div>
        </div> */}
    </>
}

export default TextConfigurations;