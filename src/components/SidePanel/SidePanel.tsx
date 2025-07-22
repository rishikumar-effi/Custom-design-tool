import { useTool } from '../../context/ToolProvider';
import styles from './SidePanel.module.css';
import Configurables from '../Configurables/Configurables';
import CanvasElements from '../CanvasElements';

const SidePanel = () => {
    const { highlightObject, activeObject, objects } = useTool();

    return (<aside className={styles.component}>
        <Configurables activeObject={activeObject}/>
        <CanvasElements objects={objects} activeObject={activeObject} highlightObject={highlightObject}/>
    </aside>)
}

export default SidePanel;