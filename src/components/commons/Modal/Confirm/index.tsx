import classNames from "classnames/bind";
import Portal from "../Portal";
import styles from "./Confirm.module.scss";

const cn = classNames.bind(styles);

interface Props {
  modalClose: () => void;
  title: string;
  text: string;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
}

export default function ConfirmModal({
  modalClose,
  title,
  text,
  onConfirm,
  cancelText = "취소",
  confirmText = "수정하기",
}: Props) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  return (
    <Portal>
      <div className={cn("overlay")} onClick={handleOverlayClick}>
        <div className={cn("modal")}>
          <h6 className={cn("modal-title")}>{title}</h6>
          <p className={cn("modal-text")}>{text}</p>
          <div className={cn("buttons")}>
            <button className={cn("cancel-button")} onClick={modalClose}>
              {cancelText}
            </button>
            <div className={cn("buttons-gap")}></div>
            <button
              className={cn("confirm-button")}
              onClick={() => {
                onConfirm();
                modalClose();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
