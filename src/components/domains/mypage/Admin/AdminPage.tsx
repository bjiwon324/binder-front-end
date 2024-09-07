// import styles from "./AdminPage.module.scss";
import classNames from "classnames/bind";
import AdminPageBar from "./AdminPageBar";
import AdminPageItem from "./AdminPageItem";

// const cn = classNames.bind(styles);

export default function AdminPage() {
  return (
    <>
      <AdminPageBar />

      <AdminPageItem title={"요청받은 쓰레기통"} />
    </>
  );
}
