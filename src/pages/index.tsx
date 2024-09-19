import KakaoMap from "@/components/domains/home/KakaoMap";
import BtnField from "@/components/domains/home/KakaoMap/SearchBtn";
import { onBoardingAtom } from "@/lib/atoms/atom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const [onBoard, setOnBoard] = useAtom(onBoardingAtom);

  const router = useRouter();

  useEffect(() => {
    if (!onBoard) {
      router.push("/onboarding");
    }
  }, []);

  return (
    <>
      <BtnField />
      <KakaoMap />
    </>
  );
}
