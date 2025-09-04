import { useTool } from '../../context/ToolProvider';
import styles from './Playground.module.css';
import { FabricJSCanvas } from 'fabricjs-react';

const Playground = () => {
    const { onPlaygroundReady, inEditingMode, exitEditingMode, scaleTo } = useTool();

    return <section className={styles.component} style={{ '--width': '427px', '--height': '650px', '--scaleTo': scaleTo } as React.CSSProperties}>
        <div className={styles['canvas-wrapper']}>
            <FabricJSCanvas
                onReady={onPlaygroundReady}
            />
            {inEditingMode && <button onClick={exitEditingMode} className={styles['editing-mode-btn']}>Exit Free Draw Mode</button>}
        </div>

    </section>
}

export default Playground;