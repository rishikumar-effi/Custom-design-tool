import IconButton from '../IconButton';
import styles from './ToolBar.module.css';
import { ToolBarIcons, Icon } from '../Icons';
import { useTool } from '../../context/ToolProvider';
import { DownloadDialog, TemplateDialog, type TemplateDialogRef } from '../Dialog';
import { useRef } from 'react';
import { ConfirmDialog, type ConfirmDialogRef } from '../Dialog/ConfirmDialog';

const { DrawFrame, DrawCircle, DrawRectangle, DrawLine, AddText, Delete, ClearAll, Download, FreeDraw } = ToolBarIcons;

const ToolBar = () => {
    const { addCircle, addRectangle, addLine, addText, activeObject, objects, clearAll, deleteSelected, importSVG, addBrush, inEditingMode, exportAsSVG, exportAsPNG } = useTool();

    const noObjectsInCanvas = objects && objects.length === 0;

    const templateDialogRef = useRef<TemplateDialogRef>(null);
    const openTemplateDialog = () => templateDialogRef?.current?.open();

    const downloadDialogRef = useRef<TemplateDialogRef>(null);
    const openDownloadDialog = () => downloadDialogRef?.current?.open();

    const confirmDialogRef = useRef<ConfirmDialogRef>(null);
    const openConfirmDialog = () => confirmDialogRef?.current?.open();

    return <section className={styles.component}>
        <TemplateDialog importSVG={importSVG} ref={templateDialogRef} />
        <DownloadDialog ref={downloadDialogRef} exportAsSVG={exportAsSVG} exportAsPNG={exportAsPNG}/>
        <ConfirmDialog ref={confirmDialogRef} clearAll={clearAll}/>
        <ul>
            <li>
                <label htmlFor="draw-frame" title="Draw Frame">
                    <IconButton onClick={openTemplateDialog} id="draw-frame" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <label htmlFor="draw-line" title="Draw Line">
                    <IconButton id="draw-line" onClick={addLine} style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '80%', height: '80%' }}>
                            <DrawLine />
                        </Icon>
                    </IconButton>
                    <span>Draw Line</span>
                </label>
            </li>
            <li data-enabled={inEditingMode}>
                <label htmlFor="free-draw" title="Draw">
                    <IconButton onClick={addBrush} id="free-draw" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '80%', height: '80%' }}>
                            <FreeDraw />
                        </Icon>
                    </IconButton>
                    <span>Free Draw</span>
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
                    <IconButton id="clear-all" onClick={openConfirmDialog} disabled={noObjectsInCanvas} style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Clear All">
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
                <label htmlFor="download">
                    <IconButton onClick={openDownloadDialog} id="download" disabled={noObjectsInCanvas} style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Export as SVG">
                        <Icon style={{ width: '100%', height: '100%' }}>
                            <Download />
                        </Icon>
                    </IconButton>
                    <span>Download</span>
                </label>
            </li>
        </ul>
    </section>;
}

export default ToolBar;