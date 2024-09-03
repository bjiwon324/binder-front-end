import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";
import { useState } from "react";
import MyPageFindBin from "../MyPageFindBin";
import MyPageSetting from "../MyPageSetting";

const cn = classNames.bind(styles);

export default function MyPageToggle() {
  const [menu, setMenu] = useState<string>("활동내역");
  return (
    <>
      <div className={cn("toggleWrap")}>
        <div className={cn("toggle")}>
          <div
            className={
              menu === "활동내역" ? cn("toggleItemOn") : cn("toggleItem")
            }
            onClick={() => setMenu("활동내역")}
          >
            활동내역
          </div>
          <div
            className={menu === "설정" ? cn("toggleItemOn") : cn("toggleItem")}
            onClick={() => setMenu("설정")}
          >
            설정
          </div>
        </div>
        <div
          className={menu === "활동내역" ? cn("toggleBar") : cn("toggleBar2")}
        ></div>
      </div>

      {menu === "활동내역" ? <MyPageFindBin /> : <MyPageSetting />}
    </>
  );
}
