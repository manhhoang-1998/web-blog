import PostBlog from "features/Post/component/post-blog/PostBlog";
import usePost from "features/Post/hooks/usePost";
import { useEffect } from "react";
import { setToken } from "services/api";
import { Link } from "react-router-dom";
import "./Profile.scss";

function Profile() {
  const {
    userInfo,
    onCreatePost,
    handleEditPost,
    onChange,
    onUploadFile,
    showForm,
    getPostData,
    isShowForm,
    isEditForm,
    post,
    postList,
    file,
    getAllPost,
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
      <Link to="/">
        <i className="back-btn fa-solid fa-circle-arrow-left"></i>
      </Link>
      <div className="container">
        <div className="userInfo">
          <img className="userInfo-avatar" src={userInfo.avatar} alt=""></img>
          <span className="userInfo-name">{userInfo.name}</span>
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
        {postList.map((item: any, index: number) => (
          <PostBlog
            key={index}
            id={item.id}
            name={userInfo.name}
            avata={userInfo.avatar}
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
  );
}

export default Profile;
