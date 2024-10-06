import { getComments, SortType } from "@/lib/apis/comments";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import styles from "./CommentList.module.scss";

const cn = classNames.bind(styles);

interface Props {
  binId: number | string;
  isFill: boolean;
}

export default function CommentList({ binId, isFill }: Props) {
  const [sortType, setSortType] = useState<SortType>("LIKE_COUNT_DESC");
  const [fixCommentId, setFixCommentId] = useState(0);
  const { data: commentsListData, refetch: refetchComments } = useQuery({
    queryKey: ["comments", binId, sortType],
    queryFn: () => getComments(binId, sortType),
  });

  const handleClickSortType = (listSortType: SortType) => {
    setSortType(listSortType);
  };

  const handleClickFixState = (id: number) => {
    setFixCommentId(id);
  };

  const bestLikeCount = commentsListData
    ? Math.max(
        ...commentsListData.commentDetails.map(
          (comment: any) => comment.likeCount
        )
      )
    : 0;

  return (
    <>
      <div className={cn("comment-title-feild")}>
        <h6 className={cn("comment-title")}>댓글</h6>
        <div>
          <button
            id="LIKE_COUNT_DESC"
            className={cn("comment-sort-btn", {
              selected: sortType === "LIKE_COUNT_DESC",
            })}
            onClick={() => handleClickSortType("LIKE_COUNT_DESC")}
          >
            추천순
          </button>
          <button
            id="CREATED_AT_DESC"
            className={cn("comment-sort-btn", {
              selected: sortType === "CREATED_AT_DESC",
            })}
            onClick={() => handleClickSortType("CREATED_AT_DESC")}
          >
            최신순
          </button>
        </div>
      </div>
      <ul className={cn("comments-list")}>
        {commentsListData && commentsListData.commentDetails.length !== 0 ? (
          commentsListData.commentDetails.map((comment: any) => (
            <Comment
              commentData={comment}
              refetchComments={refetchComments}
              isBest={comment.likeCount === bestLikeCount}
              onClickFixState={handleClickFixState}
            />
          ))
        ) : (
          <p className={cn("none-text")}>댓글이 없습니다.</p>
        )}
      </ul>
      {isFill && (
        <CommentForm
          binId={binId}
          fixCommentId={fixCommentId}
          refetchComments={refetchComments}
          onClearFixId={() => setFixCommentId(0)}
        />
      )}
    </>
  );
}
