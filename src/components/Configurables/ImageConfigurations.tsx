import { useRef } from 'react';
import styles from './Configurables.module.css';
import { fabric } from 'fabric';
import {ToolBarIcons} from '../Icons';
import IconButton from '../IconButton';

const {Image} = ToolBarIcons;

const ImageConfigurations = ({ object: oldImage }: { object: any }) => {
    const inputFileRef = useRef<null | HTMLInputElement>(null);

    const replaceImage = (file: File) => {
        const canvas = oldImage.canvas;
        if (!canvas) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const fileName = file.name ? file.name : oldImage.label ? oldImage.label : "Default image";

            const clipShape = oldImage.clipPath;

            if(clipShape){
                clipShape.set({ label: `${fileName}'s Frame` });
            }

            const base64 = e.target?.result as string;

            fabric.Image.fromURL(base64, (newImage) => {
                newImage.set({
                    left: oldImage.left,
                    top: oldImage.top,
                    scaleX: oldImage.scaleX,
                    scaleY: oldImage.scaleY,
                    clipPath: oldImage.clipPath,
                });

                (newImage as any).id = (oldImage as any).id;
                (newImage as any).label = fileName;

                canvas.remove(oldImage);
                canvas.add(newImage);
                canvas.setActiveObject(newImage);
                canvas.requestRenderAll();
            });
        };
        reader.readAsDataURL(file);
    };

    const inputFileHandler = (event: any) => {
        const file = event.target.files?.[0];

        replaceImage(file);
    }

    return <>
        <div className={styles.configurable}>
            <label htmlFor="set-image">Image</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', flex: 1 }}>
                <input type="file" id="set-image" name="image" ref={inputFileRef} style={{ width: 0, height: 0, visibility: 'hidden' }} onChange={inputFileHandler} />
                <div style={{
                    padding: '.5em 2.5em .5em 1em',
                    background: 'linear-gradient(to bottom right, rgb(70 70 70), rgb(45, 45, 45))',
                    borderRadius: '.5em',
                    boxShadow: 'inset 0px 0px 4px rgba(0, 0, 0, .5)',
                    border: '1px solid #626262',
                    position: 'relative'
                }}>
                    <span style={{
                        width: '100%',
                        maxWidth: '90px',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        display: 'block',
                        overflow: 'hidden'
                    }}>{oldImage.label || "default image"}</span>
                    <IconButton title="Upload different image" style={{
                        position: 'absolute',
                        width: '2em',
                        height: '2em',
                        right: '.25em',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }} onClick={() => inputFileRef.current?.click()}><Image/></IconButton>
                </div>
            </div>
        </div>
    </>
}

export default ImageConfigurations;