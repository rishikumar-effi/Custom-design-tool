import IconButton from '../IconButton';
import styles from './ToolBar.module.css';
import { ToolBarIcons, Icon } from '../Icons';
import { useTool } from '../../context/ToolProvider';
import useDialog from '../../hooks/useDialog';
import {TemplateDialog} from '../Dialog';

const { DrawFrame, DrawCircle, DrawRectangle, AddText, Undo, Redo, Delete, ClearAll, GetSVG } = ToolBarIcons;

const ToolBar = () => {
    const { addCircle, addRectangle, addText, activeObject, undo, redo, objects, clearAll, deleteSelected, redoStack, exportAsSVG } = useTool();

    const {Dialog, openDialog} = useDialog();

    const addTemplateHandler = () => {
        openDialog();
    }

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

    return <section className={styles.component}>
        <Dialog><TemplateDialog/></Dialog>
        <ul>
            <li>
                <label htmlFor="draw-frame" title="Draw Frame">
                    <IconButton onClick={addTemplateHandler} id="draw-frame" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '80%', height: '80%' }}>
                            <DrawFrame />
                        </Icon>
                    </IconButton>
                    <span>Add Frame</span>
                </label>
            </li>
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
        <ul>
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