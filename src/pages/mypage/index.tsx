import MyPageProfile from "@/components/domains/mypage/MyPageProfile";
import MyPageToggle from "@/components/domains/mypage/MyPageToggle";
import { getMembers } from "@/lib/apis/members";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { req } = context;
  const cookies = req.headers.cookie || "";

  await queryClient.prefetchQuery({
    queryKey: ["memberDatas"],
    queryFn: () => getMembers(cookies), // 쿠키를 전달하여 API 호출
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient), // 상태를 직렬화하여 클라이언트에 전달
    },
  };
};

export default function MyPage({
  dehydratedState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const memberData = dehydratedState.queries[0].state.data;
  return (
    <>
      {/* <HydrationBoundary state={dehydratedState}> */}
      <MyPageProfile memberData={memberData} />
      <MyPageToggle />
      {/* </HydrationBoundary> */}
    </>
  );
}
