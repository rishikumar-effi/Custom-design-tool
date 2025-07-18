import { useState } from 'react';
import styles from './TemplateDialog.module.css';

export const TemplateDialog = () => {
    const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);
    
    return <div className={styles.dialog}>
        <h2>Choose Template</h2>
        <div className={styles.frames}>
            {Array.from({ length: 3 }, (_, i) => <div key={i} onClick={() => setSelectedFrameIndex(i)} className={styles.frame} data-selected={selectedFrameIndex === i}></div>)}
        </div>
    </div>
}
