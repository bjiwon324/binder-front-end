import Portal from "@/components/commons/Modal/Portal";
import { onBoardingAtom, tutorialAtom } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import SwiperRef from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide4 from "./Slide4";
import styles from "./tutorial.module.scss";

const cn = classNames.bind(styles);

export default function Tutorial() {
  const swiperRef = useRef<null | SwiperRef>(null);
  const [tutorial, setTutorial] = useAtom(tutorialAtom);
  const [, setOnBoard] = useAtom(onBoardingAtom);

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const lastSlide = () => {
    setTutorial(true);
  };

  useEffect(() => {
    if (tutorial === false) {
      setOnBoard(false);
    }
  }, [tutorial]);
  return (
    <Portal>
      <Swiper
        id="tutorial"
        onSwiper={(swiper: any) => (swiperRef.current = swiper)}
        modules={[Pagination]}
        spaceBetween={50}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className={cn("slideWrap")}
      >
        <SwiperSlide className={cn("slide")} onClick={slideNext}>
          <Slide1 />
        </SwiperSlide>
        <SwiperSlide className={cn("slide")} onClick={slideNext}>
          <Slide2 />
        </SwiperSlide>
        <SwiperSlide className={cn("slide")} onClick={slideNext}>
          <Slide3 />
        </SwiperSlide>
        <SwiperSlide className={cn("slide")} onClick={lastSlide}>
          <Slide4 />
        </SwiperSlide>
      </Swiper>
    </Portal>
  );
}
