import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './TemplateDialog.module.css';
import templates from '../../assets/templates';
import useDialog from '../../hooks/useDialog';

export type TemplateDialogRef = { open: () => void };

type TemplateDialogProps = {
    importSVG: (svgString: string) => void;
}

export const TemplateDialog = forwardRef<TemplateDialogRef, TemplateDialogProps>(({ importSVG }, ref) => {
    const { Dialog, openDialog, closeDialog } = useDialog();

    useImperativeHandle(ref, () => ({ open: openDialog }));

    const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);

    const addSVGHandler = () => {
        const svg = templates[selectedFrameIndex];

        if (!svg) return;

        importSVG(svg);

        closeDialog();
    }

    return (
        <Dialog>
            <div className={styles.dialog}>
                <h2>Choose Template</h2>
                {
                    templates.length > 0 && <><div className={styles.frames}>
                        {
                            templates.map((template, index) => <div key={index} dangerouslySetInnerHTML={{ __html: template }} onClick={() => setSelectedFrameIndex(index)} className={styles.frame} data-selected={selectedFrameIndex === index} />)
                        }
                    </div><button onClick={addSVGHandler}>Add Template</button></>
                }
            </div>
        </Dialog>
    )
});
