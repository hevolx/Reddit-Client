
type ModalProps = {
  onClose?: () => void;
};

export const Modal = (props: ModalProps) => {

  return (
    <dialog open aria-modal="true">
      <button data-testid="modal-close" onClick={props.onClose}>Close</button>
    </dialog>
  );
}