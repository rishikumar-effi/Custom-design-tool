import IconButton from '../IconButton';
import styles from './ToolBar.module.css';
import { ToolBarIcons, Icon } from '../Icons';
import { useTool } from '../../context/ToolProvider';
import React from 'react';

const { DrawCircle, DrawRectangle, AddText, Undo, Redo, Delete, ClearAll, GetSVG } = ToolBarIcons;

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
            element = AddText;
            elementName = "Text";
            break;
        default:
            elementName = "Svg Element";
            break;
    }

    return { element, elementName }
}

const ToolBar = () => {
    const { addCircle, addRectangle, addText, activeObject, undo, redo, objects, clearAll, deleteSelected, redoStack, exportAsSVG, highlightObject } = useTool();

    const noObjectsInCanvas = objects && objects.length === 0;

    const downloadHandler = () => {
        const svg = exportAsSVG();
        if (!svg) return;

        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "canvas-export.svg";
        link.click();

        URL.revokeObjectURL(url);
    };

    // console.log(objects.map((obj: any) => console.log(obj.type)));

    return <section className={styles.component}>
        <ul>
            <li>
                <label htmlFor="draw-circle" title="Draw Circle">
                    <IconButton onClick={addCircle} id="draw-circle" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '80%', height: '80%' }}>
                            <DrawCircle />
                        </Icon>
                    </IconButton>
                    <span>Draw Circle</span>
                </label>
            </li>
            <li>
                <label htmlFor="draw-rectangle" title="Draw Rectangle">
                    <IconButton onClick={addRectangle} id="draw-rectangle" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '80%', height: '80%' }}>
                            <DrawRectangle />
                        </Icon>
                    </IconButton>
                    <span>Draw Rectangle</span>
                </label>
            </li>
            <li>
                <label htmlFor="add-text" title="Add Text">
                    <IconButton id="add-text" onClick={addText} style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '80%', height: '80%' }}>
                            <AddText />
                        </Icon>
                    </IconButton>
                    <span>Add Text</span>
                </label>
            </li>
            <li>
                <label htmlFor="undo" title="Undo">
                    <IconButton id="undo" disabled={noObjectsInCanvas} onClick={undo} style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '70%', height: '70%' }}>
                            <Undo />
                        </Icon>
                    </IconButton>
                    <span>Undo</span>
                </label>
            </li>
            <li>
                <label htmlFor="redo" title="Redo">
                    <IconButton id="redo" onClick={redo} disabled={redoStack.current && redoStack.current.length === 0} style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '70%', height: '70%' }}>
                            <Redo />
                        </Icon>
                    </IconButton>
                    <span>Redo</span>
                </label>
            </li>
            <li>
                <label htmlFor="delete" title="Delete">
                    <IconButton disabled={!activeObject} onClick={deleteSelected} id="delete" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '70%', height: '70%' }}>
                            <Delete />
                        </Icon>
                    </IconButton>
                    <span>Delete</span>
                </label>
            </li>
            <li>
                <label htmlFor="clear-all">
                    <IconButton id="clear-all" onClick={clearAll} disabled={noObjectsInCanvas} style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Clear All">
                        <Icon style={{ width: '80%', height: '80%' }}>
                            <ClearAll />
                        </Icon>
                    </IconButton>
                    <span>Clear All</span>
                </label>
            </li>
        </ul>
        <div className={styles['object-lists']}>
            {objects.length > 0 &&
                <fieldset>
                    <legend>Element(s) in Canvas</legend>
                    <ul>
                        {
                            objects.map((obj: any) => {
                                const {element, elementName} = labelElement(obj.type);
                                
                                return <li key={obj.id} data-focused={activeObject && activeObject.id === obj.id} onClick={()=>highlightObject(obj)}>
                                    <Icon style={{width: '1em', height: '1em', color: '#e0e0e0'}}>
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
        <ul>
            {/* <li>
                <label htmlFor="export-svg">
                    <IconButton id="export-svg" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Export as SVG">
                        <Icon style={{width: '90%', height: '90%'}}>
                            <Export />
                        </Icon>
                    </IconButton>
                    <span>Export as SVG</span>
                </label>
            </li> */}
            <li>
                <label htmlFor="get-svg-code">
                    <IconButton onClick={downloadHandler} id="get-svg-code" disabled={noObjectsInCanvas} style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Export as SVG">
                        <Icon style={{ width: '80%', height: '80%' }}>
                            <GetSVG />
                        </Icon>
                    </IconButton>
                    <span>Get SVG</span>
                </label>
            </li>
        </ul>
    </section>;
}

export default ToolBar;