import { useTool } from '../../context/ToolProvider';
import styles from './SidePanel.module.css';
import { ToolBarIcons, Icon } from '../Icons';
import React from 'react';
import Configurables from '../Configurables/Configurables';

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

    return (<aside className={styles.component}>
        <Configurables activeObject={activeObject}/>
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