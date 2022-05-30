import React, { FC } from "react";
import "./CommentCard.scss";
interface props {
  name: string;
  avata: string;
  postTime: string;
  comment: string;
}

const CommentCard: FC<props> = ({ name, avata, postTime, comment }) => {
  return (
    <div className="card-comment">
      <div className="card-comment__title">
        <img className="card-comment__title-avata" src={avata} alt=""></img>
        <div className="card-comment__title-user">
          <h1 className="card-comment__title-name">{name}</h1>
          <span className="card-comment__title-status">{postTime}</span>
        </div>
        <div className="card-comment__title-option">
          <i className="card-comment__title-option__icon fa-solid fa-ellipsis"></i>
          <div className="card-comment__title-option-item">
            <button className="card-comment__title-option-item__btn">
              Delete
            </button>
            <button className="card-comment__title-option-item__btn">
              Edit
            </button>
          </div>
        </div>
      </div>
      <p className="card-comment-content">{comment}</p>
    </div>
  );
};

export default CommentCard;
