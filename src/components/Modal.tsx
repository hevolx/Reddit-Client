import { useEffect } from 'react'
type ModalProps = {
  onClose: () => void;
};

export const Modal = (props: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, []);
  return (
    <div data-testid="modal-backdrop" onClick={props.onClose}>
      <dialog open aria-modal="true" tabIndex={-1}>
        <button data-testid="modal-close" onClick={(e) => {
          e.stopPropagation()
          props.onClose()
        }}>Close</button>
      </dialog>
    </div>
  );
}