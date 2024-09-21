import KakaoMap from "@/components/domains/home/KakaoMap";
import BtnField from "@/components/domains/home/KakaoMap/SearchBtn";
import Tutorial from "@/components/domains/home/Tutorial";
import { tutorialAtom } from "@/lib/atoms/atom";
import { useAtom } from "jotai";

export default function Home() {
  const [tutorial] = useAtom(tutorialAtom);
  return (
    <>
      {tutorial !== true && <Tutorial />}
      <BtnField />
      <KakaoMap />
    </>
  );
}
