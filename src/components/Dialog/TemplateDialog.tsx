import { useState } from 'react';
import styles from './TemplateDialog.module.css';
import templates from '../../assets/templates';

export const TemplateDialog = () => {
    const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);

    return <div className={styles.dialog}>
        <h2>Choose Template</h2>
        {
            templates.length > 0 && <div className={styles.frames}>
                {
                    templates.map((template, index) => <div key={index} dangerouslySetInnerHTML={{ __html: template }} onClick={() => setSelectedFrameIndex(index)} className={styles.frame} data-selected={selectedFrameIndex === index}/>)
                }
            </div>
        }
    </div>
}
