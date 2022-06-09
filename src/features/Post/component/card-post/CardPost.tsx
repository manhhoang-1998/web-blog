import { FC } from "react";
import CommentIcon from "../../../../assets/image/Icon.svg";
import "./CardPost.scss";

interface Props {
  id: string;
  userName: string;
  avatar: string;
  content: string;
  time: string;
  comments: number;
  onDeletePost: (id: string) => void;
  onEditPost: (id: string) => void;
}
const CardPost: FC<Props> = ({
  id,
  userName,
  avatar,
  content,
  time,
  comments,
  onDeletePost,
  onEditPost,
}) => {
  return (
    <div className="card-post">
      <div className="card-post__title">
        <img className="card-post__title-avatar" src={avatar} alt=""></img>
        <div className="card-post__title-user">
          <h1 className="card-post__title-name">{userName}</h1>
          <span className="card-post__title-status">{time}</span>
        </div>
        <div className="card-post__title-option">
          <i className="card-post__title-option__icon fa-solid fa-ellipsis"></i>
          <div className="card-post__title-option-item">
            <button
              className="card-post__title-option-item__btn"
              onClick={() => onDeletePost(id)}
            >
              Delete
            </button>
            <button
              className="card-post__title-option-item__btn"
              onClick={() => onEditPost(id)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <p className="card-post__content">{content}</p>
      <div className="card-post__comment">
        <img className="card-post__comment-icon" src={CommentIcon} alt=""></img>
        <span className="card-post__comment-text">{comments} comments</span>
      </div>
    </div>
  );
};

export default CardPost;
