import { getMembersTimeline } from "@/lib/apis/members";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Card from "../Card";
import styles from "./CardList.module.scss";

const cn = classNames.bind(styles);

export type Status = "REJECTED" | "APPROVED" | "PENDING";
export interface CardProps {
  id: number;
  title: string;
  address: string;
  type: string;
  status: string;
  createdAt: string;
  bookmarkCount: number;
  isAdmin?: boolean;
  admin: boolean;
  nickname?: string;
}

export default function CardList() {
  const { data: cardLists } = useQuery({
    queryKey: ["cardList"],
    queryFn: getMembersTimeline,
  });
  return (
    <ul className={cn("card-list")}>
      {cardLists === null ? (
        <span>로그인 후 이용 가능합니다.</span>
      ) : (
        cardLists?.map((item: any) => (
          <li key={item.id}>
            <Card admin={false} {...item} />
          </li>
        ))
      )}
    </ul>
  );
}
