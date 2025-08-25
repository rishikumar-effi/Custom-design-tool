import { forwardRef, useEffect, useState, useImperativeHandle } from "react"
import useDialog from "../../hooks/useDialog";
import styles from './DownloadDialog.module.css'

export type DownloadDialogRef = { open: () => void };

type DownloadDialogProps = {
    exportAsSVG: () => any;
    exportAsPNG: () => any;
}

const createDownloadLink = (data: string, type: "png" | "svg") => {
    const link = document.createElement('a');

    link.href = data;
    link.download = `canvas-export.${type}`;

    link.click();
}

const downloadAsSVG = (svg: string) => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    createDownloadLink(url, 'svg');

    URL.revokeObjectURL(url);
};

export const DownloadDialog = forwardRef<DownloadDialogRef, DownloadDialogProps>(({ exportAsSVG, exportAsPNG }, ref) => {
    const { Dialog, openDialog, isDialogOpen, closeDialog } = useDialog();

    const [isSVGSelected, setIsSVGSelected] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({ open: openDialog }));

    const [svgData, setSvgData] = useState('');

    const downloadHandler = async() => {
        if(isSVGSelected){
            downloadAsSVG(svgData);
        }
        else{
            const data = await exportAsPNG();

            createDownloadLink(data, 'png')
        }

        closeDialog();
    }

    useEffect(() => {
        const getSVGData = async() => {
            const data = await exportAsSVG();

            setSvgData(data);
        }

        if(isDialogOpen) getSVGData();
    }, [isDialogOpen]);

    return (
        <Dialog>
            <section className={styles.dialog}>
                <h2>Download as</h2>
                <article className={styles['preview-container']}>
                    <div style={{ width: '256px', height: '390px', border: '1px dashed #e0e0e0', borderRadius: '.5em' }} dangerouslySetInnerHTML={{ __html: svgData }}></div>
                    <div className={styles['preview-config']}>
                        <fieldset>
                            <legend>Download the image as</legend>
                            <div style={{ display: 'flex', gap: '1em', padding: '1em' }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                    <input type="radio" name="download-as" id="download-as-svg" checked={isSVGSelected} onChange={() => setIsSVGSelected(true)}/>
                                    <label htmlFor="download-as-svg">SVG</label>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                    <input type="radio" name="download-as" id="download-as-png" checked={!isSVGSelected} onChange={() => setIsSVGSelected(false)}/>
                                    <label htmlFor="download-as-png">PNG</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <button onClick={downloadHandler}>Download</button>
                </article>
            </section>
        </Dialog>
    )
});