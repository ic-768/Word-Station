import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) =>
  isOpen
    ? createPortal(
        <div className="fixed left-0 top-0 z-10 h-screen w-screen animate-fade-modal-in backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-black rounded-xl">
            <button
              className="absolute top-2 right-2 rounded"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
            <div className="h-72 w-72 bg-zinc-950 p-6 ">{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
export default Modal;
