import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const useDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const openDialog = useCallback(() => setIsDialogOpen(true), []);

    const closeDialog = useCallback(() => setIsDialogOpen(false), []);

    const Dialog = ({ children }: { children: React.ReactNode }) => {
        const dialogRef = useRef<HTMLDialogElement>(null);

        useEffect(() => {
            const dialog = dialogRef.current;

            if (isDialogOpen && dialog) {
                if (!dialog.open) dialog.showModal();

                const handleCancel = (e: Event) => {
                    e.preventDefault();
                    closeDialog();
                };

                dialog.addEventListener("cancel", handleCancel);
                return () => dialog.removeEventListener("cancel", handleCancel);
            }
        }, [isDialogOpen, closeDialog]);

        const rootElement = typeof document !== "undefined" ? document.getElementById("root") : null;

        if (!rootElement || !isDialogOpen) return null;

        return createPortal(<dialog onClick={(event)=> event.target === dialogRef.current &&  closeDialog()} ref={dialogRef}><section onClick={(e) => e.stopPropagation()}>{children}</section></dialog>, rootElement);
    }

    return { openDialog, closeDialog, Dialog, isDialogOpen }
}

export default useDialog;