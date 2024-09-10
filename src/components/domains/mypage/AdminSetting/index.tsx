import classNames from "classnames/bind";
import styles from "./AdminSetting.module.scss";
import SettingItem from "../MyPageSetting/SettingItem";
import trashCall from "@/../public/images/trashCall.svg";
import declaration from "@/../public/images/declaration.svg";
import pen from "@/../public/images/pen.svg";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);
export default function AdminSetting() {
  const router = useRouter();

  return (
    <div className={cn("settingWrapAdmin")}>
      <SettingItem
        name={"요청받은 쓰레기통"}
        handleFn={() => router.push("/mypage/ask")}
        img={trashCall}
      />
      <SettingItem
        name={"신고받은 쓰레기통"}
        handleFn={() => router.push("/mypage/report")}
        img={declaration}
      />
      <SettingItem
        name={"수정요청 쓰레기통"}
        handleFn={() => router.push("/mypage/fix")}
        img={pen}
      />
    </div>
  );
}
