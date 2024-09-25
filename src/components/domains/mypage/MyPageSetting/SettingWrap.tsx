import accountDelete from "@/../public/images/accountDelete.svg";
import logoutImg from "@/../public/images/logout.svg";
import shareImg from "@/../public/images/share.svg";
import sun from "@/../public/images/sun.svg";
import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";
import SettingItem from "./SettingItem";

const cn = classNames.bind(styles);

interface SettingProps {
  handleDropShare: () => void;
  logout: () => void;
  handleDrop: () => void;
  socialLogin: () => void;
  loginStates: boolean;
  handleTheme: () => void;
}
export default function SettingWrap({
  handleDropShare,
  logout,
  handleDrop,
  socialLogin,
  loginStates,
  handleTheme,
}: SettingProps) {
  return (
    <div className={cn("settingWrap")}>
      <SettingItem
        name={"공유하기"}
        handleFn={handleDropShare}
        img={shareImg}
      />
      <SettingItem name={"화면 테마"} handleFn={handleTheme} img={sun} />
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
