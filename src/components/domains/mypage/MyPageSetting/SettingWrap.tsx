import accountDelete from "@/../public/images/accountDelete.svg";
import logoutImg from "@/../public/images/logout.svg";
import shareImg from "@/../public/images/share.svg";
import SettingItem from "./SettingItem";
import styles from "./MyPageToggle.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface SettingProps {
  handleDropShare: () => void;
  logout: () => void;
  handleDrop: () => void;
  socialLogin: () => void;
  loginStates: boolean;
}
export default function SettingWrap({
  handleDropShare,
  logout,
  handleDrop,
  socialLogin,
  loginStates,
}: SettingProps) {
  return (
    <div className={cn("settingWrap")}>
      <SettingItem
        name={"공유하기"}
        handleFn={handleDropShare}
        img={shareImg}
      />
      {loginStates ? (
        <div>
          <SettingItem name={"로그아웃"} handleFn={logout} img={logoutImg} />
          <SettingItem
            name={"탈퇴하기"}
            handleFn={handleDrop}
            img={accountDelete}
          />
        </div>
      ) : (
        <SettingItem
          name={"소셜 로그인"}
          handleFn={socialLogin}
          img={logoutImg}
        />
      )}
    </div>
  );
}
