import {
  getCommentDetail,
  patchComment,
  postComment,
} from "@/lib/apis/comments";
import { useToggle } from "@/lib/hooks/useToggle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface InputValue {
  content: string;
}

export const useCommentForm = (
  binId: number | string,
  fixCommentId: number,
  refetchComments: () => void,
  onClearFixId: () => void
) => {
  const [isOpenToast, openToast, closeToast] = useToggle(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm<InputValue>({ mode: "onChange" });

  // 댓글 등록 로직
  const { mutate: postCommentMutate } = useMutation({
    mutationFn: (content: string) => postComment(binId, content),
    onSuccess: () => {
      refetchComments();
      openToast();
      setValue("content", "");
      setTimeout(() => {
        closeToast();
      }, 3000);
    },
    onError: (error: any) => {
      setError("content", {
        type: "manual",
        message: error.response?.data.message.replace(/\(.*?\)/, ""),
      });
    },
  });

  // 댓글 수정 로직
  const { mutate: patchCommentMutate } = useMutation({
    mutationFn: (content: string) => patchComment(fixCommentId, content),
    onSuccess: () => {
      refetchComments();
      openToast();
      setValue("content", "");
      setTimeout(() => {
        closeToast();
        onClearFixId();
      }, 3000);
    },
    onError: (error: any) => {
      setError("content", {
        type: "manual",
        message: error.response?.data.message.replace(/\(.*?\)/, ""),
      });
    },
  });

  // 수정 중일 때 기존 댓글 데이터 가져오기
  const { data: fixCommentData } = useQuery({
    queryKey: ["comment-detail", fixCommentId],
    queryFn: () => getCommentDetail(fixCommentId),
    enabled: fixCommentId !== 0,
  });

  useEffect(() => {
    if (fixCommentData?.commentDetail) {
      setValue("content", fixCommentData.commentDetail.content);
    }
  }, [fixCommentData]);

  // 폼 제출 로직
  const handleOnSubmit = (data: InputValue) => {
    if (fixCommentId !== 0) {
      patchCommentMutate(data.content);
    } else {
      postCommentMutate(data.content);
    }
  };

  return {
    register,
    handleSubmit,
    handleOnSubmit,
    control,
    errors,
    isOpenToast,
    setValue,
  };
};
