import { FC } from "react";
import { MdClose } from "react-icons/md";

interface CloseButtonProps {
  onDismiss: () => void;
  className?: string;
}

export const CloseButton: FC<CloseButtonProps> = ({ onDismiss, className }) => {
  return (
    <button
      className={`${className} w-11 h-11 flex items-center justify-center rounded-lg hover:bg_dark_4 duration-150 text-dark`}
      onClick={onDismiss}
    >
      <MdClose size={25} />
    </button>
  );
};
