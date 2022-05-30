import React, { FC } from "react";
import CommentIcon from "../../image/Icon.svg";
import "./CardPost.scss";

interface Props {
  userName: string;
  avata: string;
  post: string;
  postTime: string;
  comments: number;
  delPost: () => void;
  editPost: () => void;
}
const CardPost: FC<Props> = ({
  userName,
  avata,
  post,
  postTime,
  comments,
  delPost,
  editPost,
}) => {
  return (
    <div className="card-post">
      <div className="card-post__title">
        <img className="card-post__title-avata" src={avata} alt=""></img>
        <div className="card-post__title-user">
          <h1 className="card-post__title-name">{userName}</h1>
          <span className="card-post__title-status">{postTime}</span>
        </div>
        <div className="card-post__title-option">
          <i className="card-post__title-option__icon fa-solid fa-ellipsis"></i>
          <div className="card-post__title-option-item">
            <button
              className="card-post__title-option-item__btn"
              onClick={delPost}
            >
              Delete
            </button>
            <button
              className="card-post__title-option-item__btn"
              onClick={editPost}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <p className="card-post__content">{post}</p>
      <div className="card-post__comment">
        <img className="card-post__comment-icon" src={CommentIcon} alt=""></img>
        <span className="card-post__comment-text">{comments} comments</span>
      </div>
    </div>
  );
};

export default CardPost;
