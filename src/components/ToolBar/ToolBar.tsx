import IconButton from '../IconButton';
import styles from './ToolBar.module.css';
import { ToolBarIcons, Icon } from '../Icons';

const { DrawCircle, DrawRectangle, AddText, Undo, Redo, Delete, ClearAll } = ToolBarIcons;

const ToolBar = () => {
    return <section className={styles.component}>
        <ul>
            <li>
                <label htmlFor="draw-circle">
                    <IconButton id="draw-circle" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Draw Circle">
                        <Icon style={{width: '80%', height: '80%'}}>
                            <DrawCircle />
                        </Icon>
                    </IconButton>
                    <span>Draw Circle</span>
                </label>
            </li>
            <li>
                <label htmlFor="draw-rectangle">
                    <IconButton id="draw-rectangle" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Draw Rectangle">
                        <Icon style={{width: '80%', height: '80%'}}>
                            <DrawRectangle />
                        </Icon>
                    </IconButton>
                    <span>Draw Rectangle</span>
                </label>
            </li>
            <li>
                <label htmlFor="add-text">
                    <IconButton id="add-text" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Add Text">
                        <Icon style={{width: '80%', height: '80%'}}>
                            <AddText />
                        </Icon>
                    </IconButton>
                    <span>Add Text</span>
                </label>
            </li>
            <li>
                <label htmlFor="undo">
                    <IconButton id="undo" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Undo">
                        <Icon style={{width: '70%', height: '70%'}}>
                            <Undo />
                        </Icon>
                    </IconButton>
                    <span>Undo</span>
                </label>
            </li>
            <li>
                <label htmlFor="redo">
                    <IconButton id="redo" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Redo">
                        <Icon style={{width: '70%', height: '70%'}}>
                            <Redo />
                        </Icon>
                    </IconButton>
                    <span>Redo</span>
                </label>
            </li>
            <li>
                <label htmlFor="delete">
                    <IconButton id="delete" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete">
                        <Icon style={{width: '70%', height: '70%'}}>
                            <Delete />    
                        </Icon>
                    </IconButton>
                    <span>Delete</span>
                </label>
            </li>
            <li>
                <label htmlFor="clear-all">
                    <IconButton id="clear-all" style={{ width: '3em', height: "3em", padding: '.25em', color: 'rgb(30,32,34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Clear All">
                        <Icon style={{width: '80%', height: '80%'}}>
                            <ClearAll />
                        </Icon>
                    </IconButton>
                    <span>Clear All</span>
                </label>
            </li>
        </ul>
    </section>;
}

export default ToolBar;