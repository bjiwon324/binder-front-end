import styles from "./SigninButton.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface Props {
  onClick: () => void;
  label: "kakao" | "naver" | "google";
  testId: "kakaoBtn" | "naverBtn" | "googleBtn";
}

const links = {
  kakao: "카카오",
  naver: "네이버",
  google: "구글",
};

export default function SigninButton({ onClick, label, testId }: Props) {
  return (
    <button onClick={onClick} type="button" className={cn("btn-box", label)} data-cy={testId}>
      <p className={cn("btn-text")}>{links[label]}로 로그인</p>
    </button>
  );
}
