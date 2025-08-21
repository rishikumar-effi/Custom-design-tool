import styles from './CanvasElements.module.css';
import React from 'react';
import { ToolBarIcons, Icon } from '../Icons';
import IconButton from '../IconButton';
const { DrawCircle, DrawRectangle, Text, Group, Image, DrawLine, FreeDraw, MoveForward, MoveBehind } = ToolBarIcons;

const labelElement = (obj: any) => {
    let elementName;
    let element;
    const label = obj.type;

    switch (label) {
        case 'circle':
            element = DrawCircle;
            elementName = "Circle";
            break;
        case 'rect':
            element = DrawRectangle;
            elementName = "Rectangle";
            break;
        case 'textbox':
        case 'text':
            element = Text;
            elementName = obj.text || "Text";
            break;
        case 'group':
            element = Group;
            elementName = obj.label || "Group";
            break;
        case 'image':
            element = Image;
            elementName = "Image";
            break;
        case 'line':
            element = DrawLine;
            elementName = "Line";
            break;
        case 'path':
            element = FreeDraw;
            elementName = "Path";
            break;
        default:
            elementName = label;
            break;
    }

    return { element, elementName }
}

const CanvasElements = ({ objects, activeObject, highlightObject, moveObjectBehind, moveObjectForward}: { objects: any, activeObject: any, highlightObject: any, moveObjectBehind: (objectId: string) => void, moveObjectForward: (objectId: string) => void, frameId: string }) => {
    
    return <div className={styles.component}>
        <fieldset>
            <legend>Element(s) in Canvas</legend>
            {objects.length > 0 ? <ul>
                {
                    objects.map((obj: any, index: number) => {
                        const { element, elementName } = labelElement(obj);

                        return <li className={styles.object} key={obj.id} data-focused={activeObject && activeObject.id === obj.id} onClick={(event) => highlightObject(event, obj)}>
                            <div className={styles['object-props']}>
                                <Icon style={{ width: '1.25em', height: '1.25em', color: '#e0e0e0' }}>
                                    {element && React.createElement(element)}
                                </Icon>
                                <div className={styles['object-info']}>
                                    <span>
                                        {elementName}
                                    </span>
                                    <div>
                                        {(index !== 0) && <IconButton title="Move Backward" onClick={() => moveObjectForward(obj.id)}>
                                            <Icon style={{ width: '1em', height: '1em', color: '#e0e0e0' }}>
                                                <MoveForward />
                                            </Icon>
                                        </IconButton>}
                                        {(index !== (objects.length - 1)) && <IconButton title="Move Forward" onClick={() => moveObjectBehind(obj.id)}>
                                            <Icon style={{ width: '1em', height: '1em', color: '#e0e0e0' }}>
                                                <MoveBehind />
                                            </Icon>
                                        </IconButton>}
                                    </div>
                                </div>
                            </div>
                            {
                                obj._objects && <ul className={styles.nested}>
                                    {
                                        obj._objects.map((nestedObj: any, index: number) => {
                                            const { element, elementName } = labelElement(nestedObj);

                                            return <li key={index} className={styles.object} data-focused={activeObject && activeObject.id === nestedObj.id} onClick={(event) => highlightObject(event, nestedObj)}>
                                                <div className={styles['object-props']}>
                                                    <Icon style={{ width: '1.25em', height: '1.25em', color: '#e0e0e0' }}>
                                                        {element && React.createElement(element)}
                                                    </Icon>
                                                    <div className={styles['object-info']}>
                                                        <span>{elementName}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                            }
                        </li>
                    })
                }
            </ul> : <p className={styles['placeholder-text']}>No objects in canvas</p>}
        </fieldset>
    </div>
}

export default CanvasElements;