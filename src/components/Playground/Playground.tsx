import { useTool } from '../../context/ToolProvider';
import styles from './Playground.module.css';
import { FabricJSCanvas } from 'fabricjs-react';

const Playground = () => {
    const { onPlaygroundReady, inEditingMode, exitEditingMode} = useTool();

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (editor?.canvas) {
    //             const container = document.querySelector(`.${styles['canvas-wrapper']}`);
    //             if (container) {
    //                 editor.canvas.setWidth(container.clientWidth);
    //                 editor.canvas.setHeight(container.clientHeight);
    //                 editor.canvas.renderAll();
    //             }
    //         }
    //     };

    //     window.addEventListener('resize', handleResize);
    //     handleResize();

    //     return () => window.removeEventListener('resize', handleResize);
    // }, [editor, onPlaygroundReady]);

    return <section className={styles.component}>
        <div className={styles['canvas-wrapper']} style={{ width: '100%', height: '100%' }}>
            <FabricJSCanvas
                onReady={onPlaygroundReady}
            />
            {inEditingMode && <button onClick={exitEditingMode} className={styles['editing-mode-btn']}>Exit Free Draw Mode</button>}
        </div>
    </section>
}

export default Playground;