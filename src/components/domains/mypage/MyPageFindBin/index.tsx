import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";

const cn = classNames.bind(styles);
export default function MyPageFindBin() {
  return <div className={cn("findWrap")}>MyPageFindBin</div>;
}
