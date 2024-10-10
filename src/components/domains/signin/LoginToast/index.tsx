import classNames from "classnames/bind";
import styles from "./LoginToast.module.scss";

const cn = classNames.bind(styles);

export default function LoginToast() {
  return (
    <article className={cn("toast-wrapper")}>
      <p className={cn("toast-text")}>
        간편 로그인하기<span className={cn("toast-text-glitter")}>✨</span>
      </p>
    </article>
  );
}
