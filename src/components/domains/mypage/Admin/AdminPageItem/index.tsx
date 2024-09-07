import { useQuery } from "@tanstack/react-query";
import styles from "./AdminPageItem.module.scss";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { getAdminBins } from "@/lib/apis/admin";
import arrowGary from "@/../public/images/arrowGray.svg";
import Image from "next/image";
import { useState } from "react";
import AdminFilter from "@/components/commons/DropBottom/AdminFilter";
import Card from "@/components/commons/Card";

const cn = classNames.bind(styles);

interface AdminProps {
  title: string;
}
export default function AdminPageItem({ title }: AdminProps) {
  const [drop, setDrop] = useState<boolean>(false);
  const [pageFilter, setPageFilter] = useState<string>("전체");

  const router = useRouter();
  const getBins = () => {
    if (title === "요청받은 쓰레기통") {
      return getAdminBins(pageFilter);
    } else if (title === "신고받은 쓰레기통") {
      return getAdminBins(pageFilter);
    } else {
      return getAdminBins(pageFilter);
    }
  };
  const { data: bins } = useQuery({
    queryKey: ["bins", pageFilter],
    queryFn: () => getBins(),
  });

  const handleDrop = () => {
    setDrop((prev) => !prev);
  };

  return (
    <>
      <div className={cn("adminWrap")}>
        <div className={cn("adminTitleWrap")}>
          <div className={cn("adminTitle")}>
            <div className={cn("adminTitleText")}>{title}</div>
            <div className={cn("adminTitleTag")}>{bins?.pendingCount}건</div>
          </div>
          <div className={cn("adminDrop")} onClick={handleDrop}>
            {pageFilter}
            <Image src={arrowGary} alt="드롭다운" width={10} height={10} />
          </div>
        </div>

        <div className={cn("adminCardList")}>
          {bins?.binRegistrationDetails.map((item: any, index: number) => (
            <div
              onClick={() => {
                router.push(router.asPath + "/" + item.binId);
              }}
              key={index}
            >
              <Card
                id={item.binId}
                title={item.title}
                address={item.address}
                type={item.type}
                status={item.status}
                createdAt={item.createdAt}
                nickname={item.nickname}
                bookmarkCount={0}
                admin={true}
              />
            </div>
          ))}
        </div>
      </div>

      {drop && (
        <AdminFilter
          closeModal={handleDrop}
          setPageFilter={setPageFilter}
          pageFilter={pageFilter}
        />
      )}
    </>
  );
}
