import { useEffect, useRef } from 'react'
type ModalProps = {
  onClose: () => void;
};

export const Modal = (props: ModalProps) => {
  const refContainer = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, []);

  useEffect(() => {
    refContainer.current?.focus();
  }, []);

  return (
    <div data-testid="modal-backdrop" onClick={props.onClose}>
      <dialog open aria-modal="true" tabIndex={-1} onClick={(e) => { e.stopPropagation() }}>
        <button data-testid="modal-close" onClick={props.onClose} ref={refContainer}>Close</button>
      </dialog>
    </div>
  );
}