import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";
import accountDelete from "@/../public/images/accountDelete.svg";
import logout from "@/../public/images/logout.svg";
import arrowRight from "@/../public/images/arrowRight.svg";
import Image from "next/image";
import SettingItem from "./SettingItem";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "@/lib/apis/auth";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);
export default function MyPageSetting() {
  const router = useRouter();
  const { mutate: logout } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      // router.push("/");
    },
  });

  return (
    <div className={cn("findWrap")}>
      <div className={cn("settingWrap")}>
        <SettingItem name={"로그아웃"} handleFn={logout} />
        <SettingItem name={"탈퇴하기"} handleFn={() => {}} />
      </div>
    </div>
  );
}
