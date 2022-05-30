import "./PostBlog.scss";
import React, { FC } from "react";
import CommentCard from "../comment-card/CommentCard";

const commentData = [
  {
    name: "Rose",
    avata: require("../../image/terrorist-pepe.jpg"),
    postTime: "1 day ago",
    comment:
      "Easiliy craft all of your Social posts for the whole month in Figma using components. Get a visual of your full calender month, and interact with your content and copywriters in one space.",
  },
];

interface props {
  name: string;
  avata: string;
  postTime: string;
  postContent: string;
  postMedia: string;
}
const PostBlog: FC<props> = ({
  name,
  avata,
  postTime,
  postContent,
  postMedia,
}) => {
  return (
    <div className="blog-post">
      <div className="blog-post__title">
        <img className="blog-post__title-avata" src={avata} alt=""></img>
        <div className="blog-post__title-user">
          <h1 className="blog-post__title-name">{name}</h1>
          <span className="blog-post__title-status">{postTime}</span>
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
        <p className="blog-post__content-text">{postContent}</p>
        <img className="blog-post__content-media" src={postMedia} alt=""></img>
      </div>
      <div className="blog-post__comment">
        <img className="blog-post__comment-avata" src={avata}></img>
        <input
          className="blog-post__comment-create"
          placeholder="Write a comment..."
        ></input>
      </div>
      {commentData.map((item) => (
        <CommentCard
          name={item.name}
          avata={item.avata}
          postTime={item.postTime}
          comment={item.comment}
        />
      ))}
    </div>
  );
};

export default PostBlog;
