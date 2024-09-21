import classNames from "classnames/bind";
import { ReactNode } from "react";
import styles from "./Toast.module.scss";

const cn = classNames.bind(styles);

interface Prop {
  children: ReactNode;
}

export default function Toast({ children }: Prop) {
  return (
    <article className={cn("toast")}>
      <p>{children}</p>
    </article>
  );
}
