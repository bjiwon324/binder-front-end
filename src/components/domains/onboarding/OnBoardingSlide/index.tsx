import onBoarding1 from "@/../public/images/onBoarding1.svg";
import onBoarding2 from "@/../public/images/onBoarding2.svg";
import onBoarding3 from "@/../public/images/onBoarding3.svg";
import { onBoardingAtom } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useRef } from "react";
import SwiperRef from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import OnBoardingItem from "../OnBoardingItem";
import styles from "./OnBoardingSlide.module.scss";

const cn = classNames.bind(styles);

export default function OnBoardingSlide() {
  const swiperRef = useRef<null | SwiperRef>(null);
  const [, setOnBoard] = useAtom(onBoardingAtom);
  const router = useRouter();

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const lastSlide = () => {
    setOnBoard(true);
    router.push("/");
  };

  return (
    <>
      <Swiper
        id="onBoarding"
        onSwiper={(swiper: any) => (swiperRef.current = swiper)}
        modules={[Pagination]}
        spaceBetween={50}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className={cn("slideWrap")}
      >
        <SwiperSlide className={cn("slide")}>
          <OnBoardingItem
            title="근처 쓰레기통을 찾아보세요"
            subTitle="추가설명"
            imgs={onBoarding1}
            next={slideNext}
          />
        </SwiperSlide>
        <SwiperSlide className={cn("slide")}>
          <OnBoardingItem
            title="신규 쓰레기통을 등록해 주세요"
            subTitle="추가설명"
            imgs={onBoarding2}
            next={slideNext}
          />
        </SwiperSlide>
        <SwiperSlide className={cn("slide")}>
          <OnBoardingItem
            title="위치 동의 받고 빠르게 안내 받아보세요"
            imgs={onBoarding3}
            next={lastSlide}
          />
        </SwiperSlide>
      </Swiper>

      <button onClick={slideNext}>Next Slide</button>
    </>
  );
}
