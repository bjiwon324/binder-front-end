import SigninButton from "@/components/domain/signin/SigninButton";

export default function SignIn() {
  const handleClickKakaoSignIn = () => {
    window.location.href = "";
  };

  const handleClickNaverSignIn = () => {
    window.location.href = "https://api.bin-finder.net/oauth2/authorization/naver";
  };
  const handleClickGoogleSignIn = () => {
    window.location.href = "https://api.bin-finder.net/oauth2/authorization/google";
  };
  return (
    <>
      <SigninButton label="kakao" onClick={handleClickKakaoSignIn} testId={"kakaoBtn"} />
      <SigninButton label="naver" onClick={handleClickNaverSignIn} testId={"naverBtn"} />
      <SigninButton label="google" onClick={handleClickGoogleSignIn} testId={"googleBtn"} />
    </>
  );
}
