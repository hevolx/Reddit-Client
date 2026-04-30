import { useEffect, useRef } from 'react'
type ModalProps = {
  onClose: () => void;
  children?: React.ReactNode;
};

/** Accessible modal dialog — uses the native `<dialog>` API for focus trapping and background inertness. */
export const Modal = ({ onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => { dialog?.close(); };
  }, []);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <div data-testid="modal-backdrop" onClick={handleClose}>
      <dialog ref={dialogRef} aria-modal="true" tabIndex={-1} onClick={(e) => { e.stopPropagation() }}>
        <button data-testid="modal-close" onClick={handleClose} autoFocus>Close</button>
        {children}
      </dialog>
    </div>
  );
}