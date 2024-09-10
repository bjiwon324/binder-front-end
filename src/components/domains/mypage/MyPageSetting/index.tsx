import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "@/lib/apis/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DropCancel from "@/components/commons/DropBottom/DropCancel";
import Share from "@/components/commons/Modal/Share";
import { useAtom } from "jotai";
import { adminUser, loginState } from "@/lib/atoms/userAtom";
import ShareNoti from "@/components/commons/Modal/Share/ShareNoti";
import DeleteMemberModal from "@/components/commons/Modal/DeleteMember";
import AdminSetting from "../AdminSetting";
import SettingWrap from "./SettingWrap";

const cn = classNames.bind(styles);
export default function MyPageSetting() {
  const [drop, setDrop] = useState<boolean>(false);
  const [dropShare, setDropShare] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loginStates, setLoginState] = useAtom(loginState);
  const [isAdmin] = useAtom(adminUser);

  const router = useRouter();
  const { mutate: logout } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleDrop = () => {
    setDrop((prev) => !prev);
  };
  const handleDropShare = () => {
    setDropShare((prev) => !prev);
  };
  const socialLogin = () => {
    setLoginState(false);
    router.push("/signin");
  };
  const deleteModalClose = () => {
    setDeleteModal(false);
    router.push("/");
    router.reload();
  };

  useEffect(() => {
    if (share) {
      setTimeout(() => {
        setShare(false);
      }, 3000);
    }
  }, [share]);
  return (
    <div className={cn("findWrap")}>
      <SettingWrap
        handleDropShare={handleDropShare}
        logout={logout}
        handleDrop={handleDrop}
        socialLogin={socialLogin}
        loginStates={loginStates}
      />
      {isAdmin && <AdminSetting />}

      {drop && <DropCancel handleDrop={handleDrop} setDeleteModal={setDeleteModal} />}
      {dropShare && <Share modalClose={handleDropShare} setShare={setShare} />}
      {share && <ShareNoti />}
      {deleteModal && <DeleteMemberModal modalClose={deleteModalClose} />}
    </div>
  );
}
