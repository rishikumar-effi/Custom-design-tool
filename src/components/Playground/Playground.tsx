import { useTool } from '../../context/ToolProvider';
import styles from './Playground.module.css';
import { FabricJSCanvas } from 'fabricjs-react';

const Playground = () => {
    const { onPlaygroundReady, inEditingMode, exitEditingMode, scaleTo, canvasDimension, deSelectAll } = useTool();

    const {width, height} = canvasDimension;

    return <section className={styles.component} onClick={() => deSelectAll()} style={{ '--width': `${width}px`, '--height': `${height}px`, '--scaleTo': scaleTo } as React.CSSProperties}>
        <div className={styles['canvas-wrapper']} onClick={(event) => event.stopPropagation()}>
            <FabricJSCanvas
                onReady={onPlaygroundReady}
            />
            {inEditingMode && <button onClick={exitEditingMode} className={styles['editing-mode-btn']}>Exit Free Draw Mode</button>}
        </div>

    </section>
}

export default Playground;