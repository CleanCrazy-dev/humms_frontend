import Image from "next/image";
import React from "react";
import { default as ReactModal, Styles } from "react-modal";
import { MdClose, MdArrowBack } from "react-icons/md";
import { InjectedProps } from "./types";
import { CloseButton } from "./CloseButton";

export const modalStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "18px",
    boxShadow: "none",
    padding: 0,
  },
  overlay: {
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(5px)",
  },
};

interface ModalProps extends InjectedProps {
  title?: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
  width?: string;
  px?: number;
  py?: number;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  width = "md:w-[550px]",
  px = 12,
  py = 14,
}) => (
  <ReactModal isOpen={!!isOpen} onRequestClose={onDismiss} style={modalStyles}>
    <div
      className={`${width} px-${px.toString()} py-${py.toString()} rounded-3xl bg-white overflow-hidden relative flex items-center flex-col`}
    >
      {onBack && (
        <button
          className="absolute top-5 left-5 w-11 h-11 flex items-center justify-center rounded-lg hover:bg_dark_4 duration-150 text-dark"
          onClick={onBack}
        >
          <MdArrowBack size={25} />
        </button>
      )}

      {!!title && (
        <div className="flex items-center p-1 gap-2 select-none">
          <div className="w-7 h-7 rounded-full overflow-hidden relative">
            <Image
              src="/images/metis_logo.png"
              alt="metis_logo"
              layout="fill"
              priority
            />
          </div>
          <p className="text-base font-semibold text-dark">{title}</p>
        </div>
      )}

      {!hideCloseButton && (
        <CloseButton className="absolute top-5 right-5" onDismiss={onDismiss} />
      )}

      {children}
    </div>
  </ReactModal>
);

export default Modal;
