import { postData } from "model/post/post.model";
import { FC, useEffect } from "react";
import { setToken } from "services/api";
import usePost from "../hooks/usePost";
import "./BlogPage.scss";
import CardPost from "./card-post/CardPost";
import PostBlog from "./post-blog/PostBlog";
import { Link } from "react-router-dom";

const BlockPage: FC = () => {
  const {
    userInfo,
    onLogout,
    onCreatePost,
    onDeletePost,
    onEditPost,
    handleEditPost,
    onChange,
    onUploadFile,
    showForm,
    getPostData,
    onUploadAvatar,
    onSetUpAvatar,
    isShowForm,
    isEditForm,
    post,
    postList,
    file,
    avatar,
    isSetupForm,
    showSetUpForm,
    getAllPost,
    newsData,
    comment,
    onChangeComment,
    createComment,
  } = usePost();

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    setToken(JSON.parse(token || "{}"));
    getPostData();
    getAllPost();
  }, [token]);
  return (
    <div className="page">
      <div className="post">
        <div className="post-option">
          <img
            className="post-option__logo"
            src={require("assets/image/logo.png")}
            alt=""
          ></img>
          <button className="post-option__logout" onClick={() => onLogout()}>
            <i className="post-option__logout-icon fa-solid fa-arrow-right-from-bracket"></i>
            <span className="post-option__logout-text">Log out</span>
          </button>
        </div>

        <div className="post-user">
          <img className="post-user__avata" src={userInfo.avatar} alt=""></img>
          <label htmlFor="avatar" className="post-user__setup">
            <i className="post-user__setup-icon fa-solid fa-camera"></i>
          </label>
          <input
            type="file"
            id="avatar"
            style={{ display: "none" }}
            onChange={(e) => onUploadAvatar(e)}
          ></input>
          <Link to="/profile">
            <span className="post-user__name">{userInfo.name}</span>
          </Link>
          {isSetupForm ? (
            <div className="overlay">
              <div className="setup-form">
                <label
                  htmlFor="overlay-btn"
                  className="post-action__overlay-box-close"
                >
                  <i className="post-action__overlay-box-close-icon fa-solid fa-xmark"></i>
                </label>
                <button
                  type="button"
                  className="post-action__overlay-box-button"
                  id="overlay-btn"
                  onClick={() => showSetUpForm(false)}
                ></button>
                <img className="setup-img" src={avatar.url} alt=""></img>
                <button className="setup-btn" onClick={() => onSetUpAvatar()}>
                  Save
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditForm ? handleEditPost() : onCreatePost();
          }}
        >
          <div className="post-action">
            <textarea
              value={isShowForm ? "" : post.content}
              className="post-action__content"
              placeholder="Hi! What are you thinking ?"
              onChange={(e) => onChange(e)}
            />
            <label className="post-action__file" htmlFor="input-file">
              <span className="post-action__file-desc">
                "Add photos, media to the post"
              </span>
              <i className="post-action__file-icon fa-solid fa-image"></i>
            </label>
            {isShowForm ? (
              <div className="post-action__overlay">
                <div className="post-action__overlay-box">
                  <label
                    htmlFor="overlay-btn"
                    className="post-action__overlay-box-close"
                  >
                    <i className="post-action__overlay-box-close-icon fa-solid fa-xmark"></i>
                  </label>
                  <button
                    type="button"
                    className="post-action__overlay-box-button"
                    id="overlay-btn"
                    onClick={() => showForm(false)}
                  ></button>
                  <input
                    value={post.content}
                    onChange={(e) => onChange(e)}
                    className="post-action__overlay-box-input"
                    placeholder="Hi! What are you thinking?"
                  ></input>
                  <img
                    src={file}
                    className="post-action__overlay-box-link"
                    alt=""
                  />
                  <input
                    style={{
                      width: "350px",
                      marginTop: "5px",
                    }}
                    type="file"
                    id=""
                    accept="image/*"
                    onChange={onUploadFile}
                  />
                  <button className="post-action__overlay-box-btn">
                    {isEditForm ? "Edit Post" : "Create Post"}
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            <button
              type="button"
              id="input-file"
              onClick={() => showForm(true)}
            ></button>
          </div>
          <button type="submit" className="post-create">
            Create Post
          </button>
        </form>

        <div className="post-list">
          <span className="post-list__title">POSTED</span>
          {postList.map((item: postData, index: number) => (
            <CardPost
              key={index}
              id={item.id}
              userName={userInfo.name}
              avatar={userInfo.avatar}
              content={item.content}
              time={item.time}
              comments={0}
              onDeletePost={onDeletePost}
              onEditPost={onEditPost}
            />
          ))}
        </div>
      </div>
      <div className="blog-container">
        <div className="blog">
          {newsData.map((item: any, index: number) => (
            <PostBlog
              key={index}
              id={item.id}
              name={item.author}
              avata={item.avatar}
              time={item.time}
              content={item.content}
              file={item.file}
              onChangeComment={onChangeComment}
              createComment={createComment}
              comment={comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockPage;
