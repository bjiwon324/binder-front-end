import { BinItemType, btnInputValues } from "@/lib/constants/btnInputValues";
import classNames from "classnames/bind";
import BinTypeBtn from "./BinTypeBtn";
import styles from "./BinTypeBtnList.module.scss";

const cn = classNames.bind(styles);

interface Props {
  onClick: (id?: BinItemType["id"]) => void;
  binType: null | BinItemType["id"];
}

export default function BinTypeBtnList({ onClick, binType }: Props) {
  return (
    <ul className={cn("list")}>
      <li>
        <BinTypeBtn binType={null} isBookMarked={true} onClick={onClick} />
      </li>
      {btnInputValues.map((type) => (
        <li>
          <BinTypeBtn
            binType={binType}
            isBookMarked={false}
            type={type}
            onClick={onClick}
          />
        </li>
      ))}
    </ul>
  );
}
