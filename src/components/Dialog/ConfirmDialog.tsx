import { useImperativeHandle, forwardRef } from "react";
import useDialog from "../../hooks/useDialog";
import styles from './ConfirmDialog.module.css'

export type ConfirmDialogRef = {open: () => void};

type ConfirmDialogProps = {
    clearAll: () => void;
}

export const ConfirmDialog = forwardRef<ConfirmDialogRef, ConfirmDialogProps>(({clearAll}, ref) => {
    const {Dialog, openDialog, closeDialog} = useDialog();

    useImperativeHandle(ref, () => ({open: openDialog}));

    return (
        <Dialog>
            <div className={styles.dialog}>
                <h2>Confirmation</h2>
                <div className={styles['dialog-cnts']}>
                    <p>Do you really want to clear all?</p>
                </div>
                <div style={{display: "flex", alignItems: 'center', justifyContent: 'flex-end', gap: '1em'}}>
                    <button data-btn-type='btn-secondary' onClick={() => {
                        clearAll();
                        closeDialog();
                    }}>Yes</button>
                    <button data-btn-type='btn-primary' onClick={closeDialog}>No</button>
                </div>
            </div>
        </Dialog>
    );
});