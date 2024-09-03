import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";
import CardList from "@/components/commons/CardList";

const cn = classNames.bind(styles);
export default function MyPageFindBin() {
  return (
    <div className={cn("findWrap")}>
      <CardList />
    </div>
  );
}
