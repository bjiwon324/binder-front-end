import NavTitle from "@/components/commons/NavTitle";
import styles from "./Addbin.module.scss";
import classNames from "classnames/bind";
import AddBinForm from "@/components/domains/addBin/addBinForm";

const cn = classNames.bind(styles);

declare global {
  interface Window {
    naver: any;
  }
}

export default function AddBin() {
  return (
    <>
      <NavTitle>신규 위치 등록</NavTitle>
      <AddBinForm />
    </>
  );
}
