import { ReactNode } from 'react';

import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  show: boolean;
  onOverlayClick?: () => void;
}

const Modal = ({ children, show = false, onOverlayClick }: ModalProps) => {
  return (
    <>
      <div
        className={`${styles.overlay} ${
          show ? 'opacity-100 z-40' : 'opacity-0 -z-50'
        }`}
        onClick={() => onOverlayClick && onOverlayClick()}
      />
      <div
        className={`${styles.modalContainer} ${
          show ? 'opacity-100 z-50' : 'opacity-0 -z-50'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
