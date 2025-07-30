import { useTool } from '../../context/ToolProvider';
import styles from './Playground.module.css';
import { FabricJSCanvas } from 'fabricjs-react';

const Playground = () => {
    const {onPlaygroundReady, inEditingMode, exitEditingMode} = useTool();

    return <section className={styles.component}>
        <div className={styles['canvas-wrapper']} style={{ width: '100%', height: '100%' }}>
            <FabricJSCanvas onReady={onPlaygroundReady} />
            {inEditingMode && <button onClick={exitEditingMode} className={styles['editing-mode-btn']}>Exit Free Draw Mode</button>}
        </div>
    </section>
}

export default Playground;