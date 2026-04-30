import { useCallback, useEffect, useRef } from 'react';

type ModalProps = {
  onClose: () => void;
  label: string;
  triggerRef?: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
};

export const Modal = ({ onClose, label, triggerRef, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = useCallback(() => {
    dialogRef.current?.close();
    onClose();
    triggerRef?.current?.focus();
  }, [onClose, triggerRef]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => { dialog?.close(); };
  }, []);

  return (
    <div data-testid="modal-backdrop" onClick={handleClose}>
      <dialog
        ref={dialogRef}
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button data-testid="modal-close" onClick={handleClose} autoFocus>
            ✕ Close
          </button>
        </div>
        {children}
      </dialog>
    </div>
  );
};
