import "./PostBlog.scss";
import { FC, useEffect, useState } from "react";
import CommentCard from "../comment-card/CommentCard";
import { commentApi } from "services/postApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { getCommentByPostId } from "redux/post/comment.slice";

const defaultCommentData = {
  name: "SomeOne",
  avata: require("../../../../assets/image/frogmeme.jpg"),
  postTime: "1 day ago",
};
interface props {
  id: string;
  name: string;
  avata: string;
  time: string;
  content: string;
  file: string;
  comment: { name: string; value: string };
  onChangeComment: (e: any) => void;
  createComment: (postId: string) => void;
}

const PostBlog: FC<props> = ({
  id,
  name,
  avata,
  time,
  content,
  file,
  comment,
  onChangeComment,
  createComment,
}) => {
  // const [data, setData] = useState<any>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      getCommentByPostId(dispatch)(id);
    }
  }, [id]);

  const listCommentsByPost = useSelector((state: RootState) => state.comment);

  return (
    <div className="blog-post">
      <div className="blog-post__title">
        <img className="blog-post__title-avata" src={avata} alt=""></img>
        <div className="blog-post__title-user">
          <h1 className="blog-post__title-name">{name}</h1>
          <span className="blog-post__title-status">{time}</span>
        </div>
        <div className="blog-post__title-option">
          <i className="blog-post__title-option__icon fa-solid fa-ellipsis"></i>
          <div className="blog-post__title-option-item">
            <button className="blog-post__title-option-item__btn">
              Delete
            </button>
            <button className="blog-post__title-option-item__btn">Edit</button>
          </div>
        </div>
      </div>
      <div className="blog-post__content">
        <p className="blog-post__content-text">{content}</p>
        <img className="blog-post__content-media" src={file} alt=""></img>
      </div>
      <div className="blog-post__comment">
        <img className="blog-post__comment-avata" src={avata} alt=""></img>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createComment(id);
            console.log(listCommentsByPost);
          }}
          style={{ width: "100%" }}
        >
          <input
            id={id}
            name={id}
            value={comment.name === id ? comment.value : ""}
            onChange={(e) => onChangeComment(e)}
            className="blog-post__comment-create"
            placeholder="Write a comment..."
          ></input>
        </form>
      </div>
      {!!listCommentsByPost.comments[id] &&
        listCommentsByPost.comments[id]
          .filter((item: any, index: number) => index < 5)
          .map((item: any, index: number) => (
            <CommentCard
              key={index}
              content={item.content}
              name={defaultCommentData.name}
              avata={defaultCommentData.avata}
              postTime={defaultCommentData.postTime}
            />
          ))}
    </div>
  );
};

export default PostBlog;
