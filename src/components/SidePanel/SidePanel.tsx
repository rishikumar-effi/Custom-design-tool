import { useTool } from '../../context/ToolProvider';
import styles from './SidePanel.module.css';
import { ToolBarIcons, Icon } from '../Icons';
import React, { useEffect, useState } from 'react';

const { DrawCircle, DrawRectangle, Text } = ToolBarIcons;

const labelElement = (label: string) => {
    let elementName;
    let element;

    switch (label) {
        case 'circle':
            element = DrawCircle;
            elementName = "Circle";
            break;
        case 'rect':
            element = DrawRectangle;
            elementName = "Rectangle";
            break;
        case 'i-text':
            element = Text;
            elementName = "Text";
            break;
        default:
            elementName = "Svg Element";
            break;
    }

    return { element, elementName }
}

const SidePanel = () => {
    const { highlightObject, activeObject, objects } = useTool();

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const isText = activeObject && activeObject.type === 'i-text';

    const [text, setText] = useState<string>(activeObject ? activeObject.text : 'Insert Text');

    const [fontSize, setFontSize] = useState<number>(activeObject ? activeObject.fontSize : 0);

    const [color, setColor] = useState<string>(activeObject ? activeObject.fill : '#e0e0e0');

    const [strokeWidth, setStrokeWidth] = useState<number>(activeObject ? activeObject.strokeWidth : 1);

    const widthHandler = (e: any) => {
        const newWidth = Number(e.target.value);
        setWidth(newWidth);
        if (activeObject) {
            activeObject.set({ width: newWidth });
            activeObject.canvas?.requestRenderAll();
        }
    }

    const heightHandler = (e: any) => {
        const newHeight = Number(e.target.value);
        setHeight(newHeight);
        if (activeObject) {
            activeObject.set({ height: newHeight });
            activeObject.canvas?.requestRenderAll();
        }
    }

    const textHandler = (e: any) => {
        const value = e.target.value;

        setText(value);

        if (activeObject && isText) {
            activeObject.set({ text: value });
            activeObject.canvas?.requestRenderAll();
        }
    }

    const fontSizeHandler = (e: any) => {
        const value = e.target.value;

        setFontSize(value);

        if (activeObject && isText) {
            activeObject.set({ fontSize: value });
            activeObject.canvas?.requestRenderAll();
        }
    }

    const colorHandler = (e: any) => {
        const value = e.target.value;

        setColor(value);

        if (activeObject) {
            activeObject.set({ fill: value });
            activeObject.canvas?.requestRenderAll();
        }
    }

    const strokeWidthHandler = (e: any) =>{
        const value = +e.target.value;

        setStrokeWidth(value);

        if(activeObject){
            activeObject.set({strokeWidth: value});
            activeObject.canvas?.requestRenderAll();
        }
    }

    console.log(activeObject?.strokeWidth);

    useEffect(() => {
        if (!activeObject || !activeObject.canvas) return;

        const canvas = activeObject.canvas;

        const updateStateFromObject = () => {
            const actualWidth = Math.round((activeObject.width || 0) * (activeObject.scaleX || 1));
            const actualHeight = Math.round((activeObject.height || 0) * (activeObject.scaleY || 1));

            setWidth(actualWidth);
            setHeight(actualHeight);
            setColor(activeObject.fill || "#e0e0e0");
            setStrokeWidth(activeObject.strokeWidth || '#1e2022');

            if (isText) {
                setText(activeObject.text || '');
                setFontSize(activeObject.fontSize || 0);
            }
        };

        updateStateFromObject();

        const handleObjectModified = () => {
            updateStateFromObject();
        };

        const handleTextChanged = () => {
            if (isText) {
                setText(activeObject.text || '');
            }
        };

        canvas.on('object:modified', handleObjectModified);
        canvas.on('text:changed', handleTextChanged);

        return () => {
            canvas.off('object:modified', handleObjectModified);
            canvas.off('text:changed', handleTextChanged);
        };
    }, [activeObject]);


    return (<aside className={styles.component}>
        <div className={styles.configurables}>
            <fieldset>
                <legend>Configure</legend>
                {activeObject ? <section>
                    <div className={styles.configurable}>
                        <label htmlFor="set-width">Width</label>
                        <input onChange={widthHandler} type="number" min={0} id="set-width" name="width" value={width} />
                    </div>
                    <div className={styles.configurable}>
                        <label htmlFor="set-height">Height</label>
                        <input onChange={heightHandler} min={0} type="number" id="set-height" name="height" value={height} />
                    </div>

                    {!isText && <>
                        <div className={styles.configurable}>
                            <label htmlFor="set-stroke">Stroke Width</label>
                            <input type="number" id="set-stroke" name="stroke" min={0} onChange={strokeWidthHandler} value={strokeWidth} />
                        </div>
                        <div className={styles.configurable}>
                            <label htmlFor="set-fill">Fill</label>
                            <input type="color" name="fill" id="set-fill" value={color} onChange={colorHandler}/>
                        </div>
                    </>}
                    {isText &&
                        <>
                        <div className={styles.configurable}>
                                <label htmlFor="set-color">Font Size</label>
                                <input type="color" id="set-color" name="font-color" onChange={colorHandler} value={color} />
                            </div>
                            <div className={styles.configurable}>
                                <label htmlFor="set-fontsize">Font Size</label>
                                <input type="number" id="set-fontsize" name="fontsize" min={0} onChange={fontSizeHandler} value={fontSize} />
                            </div>
                            <div className={styles.configurable}>
                                <label htmlFor="set-text">Text</label>
                                <input type="text" id="set-text" name="text" value={text} onChange={textHandler} />
                            </div>
                        </>
                    }
                </section> : <section><p className={styles['placeholder-text']}>Select an object to configure its properties</p></section>}
            </fieldset>
        </div>
        <div className={styles['object-lists']}>
            <fieldset>
                <legend>Element(s) in Canvas</legend>
                {objects.length > 0 ? <ul>
                    {
                        objects.map((obj: any) => {
                            const { element, elementName } = labelElement(obj.type);

                            return <li key={obj.id} data-focused={activeObject && activeObject.id === obj.id} onClick={() => highlightObject(obj)}>
                                <Icon style={{ width: '1em', height: '1em', color: '#e0e0e0' }}>
                                    {element && React.createElement(element)}
                                </Icon>
                                <span>{elementName}</span>
                            </li>
                        })
                    }
                </ul> : <p className={styles['placeholder-text']}>No objects in canvas</p>}
            </fieldset>
        </div>
    </aside>)
}

export default SidePanel;