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

    console.log(activeObject);

    if (objects.length === 0) return;

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const isText = activeObject && activeObject.type === 'i-text';

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

    useEffect(() => {
        if (!activeObject) return;
        const { width, height } = activeObject;

        setWidth(width);
        setHeight(height);
    }, [activeObject])

    return <aside className={styles.component}>
        <div className={styles.configurables}>
            {activeObject && <fieldset>
                <legend>Configure</legend>
                <section>

                    <div className={styles.configurable}>
                        <label htmlFor="set-width">Width</label>
                        <input onChange={widthHandler} type="number" min={0} id="set-width" name="width" value={width} />
                    </div>
                    <div className={styles.configurable}>
                        <label htmlFor="set-height">Height</label>
                        <input onChange={heightHandler} min={0} type="number" id="set-height" name="height" value={height} />
                    </div>

                    {!isText && <div className={styles.configurable}>
                        <label htmlFor="set-stroke">Stroke Width</label>
                        <input type="number" id="set-stroke" name="stroke" min={0} defaultValue={activeObject?.strokeWidth} />
                    </div>}
                    <div className={styles.configurable}>
                        <label htmlFor="set-fill">Fill</label>
                        <input type="color" name="fill" id="set-fill" />
                    </div>
                    {isText &&
                        <div className={styles.configurable}>
                            <label htmlFor="set-text">Text</label>
                            <input type="text" id="set-text" name="text" value={activeObject?.text} />
                        </div>}
                </section>
            </fieldset>}
        </div>
        <div className={styles['object-lists']}>
            {objects.length > 0 &&
                <fieldset>
                    <legend>Element(s) in Canvas</legend>
                    <ul>
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
                    </ul>
                </fieldset>
            }
        </div>
    </aside>
}

export default SidePanel;