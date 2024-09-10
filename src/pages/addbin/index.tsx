import NavTitle from "@/components/commons/NavTitle";
import styles from "./Addbin.module.scss";
import classNames from "classnames/bind";
import AddBinForm from "@/components/domains/addBin/addBinForm";
import { userAddress, userCoordinate } from "@/lib/atoms/userAtom";
import { useAtom } from "jotai";

const cn = classNames.bind(styles);

declare global {
  interface Window {
    naver: any;
  }
}

export default function AddBin() {
  const [coordinate] = useAtom(userCoordinate);
  const [address] = useAtom(userAddress);

  console.log("addressData", coordinate);
  console.log(address);

  return (
    <>
      <NavTitle>신규 위치 등록</NavTitle>
      <AddBinForm />
    </>
  );
}
