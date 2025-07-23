import { useState } from 'react';
import styles from './TemplateDialog.module.css';
import templates from '../../assets/templates';

export const TemplateDialog = ({importSVG, closeDialog}: {importSVG: (svgString: string) => void, closeDialog: () => void}) => {
    const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);

    const addSVGHandler = () => {
        const svg = templates[selectedFrameIndex];

        if(!svg) return;

        importSVG(svg);

        closeDialog();
    }

    return <div className={styles.dialog}>
        <h2>Choose Template</h2>
        {
            templates.length > 0 && <><div className={styles.frames}>
                {
                    templates.map((template, index) => <div key={index} dangerouslySetInnerHTML={{ __html: template }} onClick={() => setSelectedFrameIndex(index)} className={styles.frame} data-selected={selectedFrameIndex === index}/>)
                }
            </div><button onClick={addSVGHandler}>Add Template</button></>
        }
    </div>
}
