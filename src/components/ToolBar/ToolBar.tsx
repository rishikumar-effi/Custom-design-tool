import IconButton from '../IconButton';
import styles from './ToolBar.module.css';
import { ToolBarIcons, Icon } from '../Icons';
import { useTool } from '../../context/ToolProvider';

const { DrawCircle, DrawRectangle, AddText, Undo, Redo, Delete, ClearAll, GetSVG } = ToolBarIcons;

const ToolBar = () => {
    const { addCircle, addRectangle, addText, activeObject } = useTool();

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
                    <IconButton id="undo" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '70%', height: '70%' }}>
                            <Undo />
                        </Icon>
                    </IconButton>
                    <span>Undo</span>
                </label>
            </li>
            <li>
                <label htmlFor="redo" title="Redo">
                    <IconButton id="redo" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '70%', height: '70%' }}>
                            <Redo />
                        </Icon>
                    </IconButton>
                    <span>Redo</span>
                </label>
            </li>
            <li>
                <label htmlFor="delete" title="Delete">
                    <IconButton disabled={!activeObject} id="delete" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '70%', height: '70%' }}>
                            <Delete />
                        </Icon>
                    </IconButton>
                    <span>Delete</span>
                </label>
            </li>
            <li>
                <label htmlFor="clear-all">
                    <IconButton id="clear-all" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Clear All">
                        <Icon style={{ width: '80%', height: '80%' }}>
                            <ClearAll />
                        </Icon>
                    </IconButton>
                    <span>Clear All</span>
                </label>
            </li>
        </ul>
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
                    <IconButton id="get-svg-code" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Export as SVG">
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