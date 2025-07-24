import styles from './CanvasElements.module.css';
import React from 'react';
import { ToolBarIcons, Icon } from '../Icons';
const { DrawCircle, DrawRectangle, Text, Group, Image } = ToolBarIcons;

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
        case 'textbox':
        case 'text':
            element = Text;
            elementName = "Text";
            break;
        case 'group':
            element = Group;
            elementName = "Group";
            break;
        case 'image':
            element = Image;
            elementName = "Image";
            break;
        default:
            elementName = label;
            break;
    }

    return { element, elementName }
}

const CanvasElements = ({ objects, activeObject, highlightObject }: { objects: any, activeObject: any, highlightObject: any }) => {
    return <div className={styles.component}>
        <fieldset>
            <legend>Element(s) in Canvas</legend>
            {objects.length > 0 ? <ul>
                {
                    objects.map((obj: any) => {
                        const { element, elementName } = labelElement(obj.type);

                        return <li className={styles.object} key={obj.id} data-focused={activeObject && activeObject.id === obj.id} onClick={() => highlightObject(obj)}>
                            <div className={styles['object-props']}>
                                <Icon style={{ width: '1.25em', height: '1.25em', color: '#e0e0e0' }}>
                                    {element && React.createElement(element)}
                                </Icon>
                                <span>{elementName}</span>
                            </div>
                            {
                                obj._objects && <ul className={styles.nested}>
                                    {
                                        obj._objects.map((nestedObj: any, index: number) => {
                                            const { element, elementName } = labelElement(nestedObj.type);
                                            return <li key={index} onClick={() => highlightObject(nestedObj)}>
                                                <div className={styles['object-props']}>
                                                    <Icon style={{ width: '1.25em', height: '1.25em', color: '#e0e0e0' }}>
                                                        {element && React.createElement(element)}
                                                    </Icon>
                                                    <span>{elementName}</span>
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