import MyPageProfile from "@/components/domains/mypage/MyPageProfile";
import MyPageToggle from "@/components/domains/mypage/MyPageToggle";
import { getMembers } from "@/lib/apis/members";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie;

  const memberData = await getMembers(cookies); // 쿠키를 포함하여 API 호출

  return {
    props: {
      memberData: memberData || null, // 데이터가 없을 경우 null로 처리
    },
  };
};

export default function MyPage({
  memberData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(memberData);
  return (
    <>
      <MyPageProfile memberData={memberData} />
      <MyPageToggle />
    </>
  );
}
