import { FC, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardPost from "../../components/card-post/CardPost";
import PostBlog from "../../components/post-blog/PostBlog";
import "./BlogPage.scss";

const userInfo = {
  name: "Adladas Khamid",
  avata: require("../../image/terrorist-pepe.jpg"),
  description: "poets",
};
const blogsData = [
  {
    name: "Langbiang",
    avata: require("../../image/avata.png"),
    postTime: "Today at 14:03",
    postContent:
      "Easiliy craft all of your Social posts for the whole month in Figma using components. Get a visual of your full calender month, and interact with your content and copywriters in one space.",
    postMedia: require("../../image/winning-prizes 1.png"),
    comment:
      "Easiliy craft all of your Social posts for the whole month in Figma using components. Get a visual of your full calender month, and interact with your content and copywriters in one space.",
  },
  {
    name: "Langbiang",
    avata: require("../../image/avata.png"),
    postTime: "Today at 14:03",
    postContent:
      "Easiliy craft all of your Social posts for the whole month in Figma using components. Get a visual of your full calender month, and interact with your content and copywriters in one space.",
    postMedia: require("../../image/winning-prizes 1.png"),
    comment:
      "Easiliy craft all of your Social posts for the whole month in Figma using components. Get a visual of your full calender month, and interact with your content and copywriters in one space.",
  },
  {
    name: "Langbiang",
    avata: require("../../image/avata.png"),
    postTime: "Today at 14:03",
    postContent:
      "Easiliy craft all of your Social posts for the whole month in Figma using components. Get a visual of your full calender month, and interact with your content and copywriters in one space.",
    postMedia: require("../../image/winning-prizes 1.png"),
  },
];

const BlockPage: FC = () => {
  // route
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
  };

  // list post
  interface postsData {
    post: string;
    image: string;
    postTime: string;
    comment: number;
  }
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [list, setList] = useState<postsData[]>(
    JSON.parse(localStorage.getItem("posts") || "[]")
  );

  const inputElement = useRef<any>();
  function handleCreatePOst() {
    setList([
      ...list,
      {
        post: post,
        image: image,
        postTime: "1 day ago",
        comment: 2,
      },
    ]);
    setPost("");
    inputElement.current.focus();
  }
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(list));
  }, [list]);

  function handleDeletePOst(arg: number) {
    setList([...list].filter((item, index) => index !== arg));
  }

  function handleEditPost(arg: number) {}

  return (
    <div className="page">
      <div className="post">
        <div className="post-option">
          <img
            className="post-option__logo"
            src={require("../../image/logo.png")}
            alt=""
          ></img>
          <button className="post-option__logout" onClick={logOut}>
            <i className="post-option__logout-icon fa-solid fa-arrow-right-from-bracket"></i>
            <span className="post-option__logout-text">Log out</span>
          </button>
        </div>
        <div className="post-user">
          <img className="post-user__avata" src={userInfo.avata} alt=""></img>
          <span className="post-user__name">{userInfo.name}</span>
          <span className="post-user__desc">{userInfo.description}</span>
        </div>
        <div className="post-action">
          <textarea
            ref={inputElement}
            value={post}
            className="post-action__content"
            placeholder="Hi! What are you thinking ?"
            onChange={(e) => setPost(e.target.value)}
          />
          <label className="post-action__file" htmlFor="input-file">
            <span className="post-action__file-desc">
              Add the photos, media to the post
            </span>
            <i className="post-action__file-icon fa-solid fa-image"></i>
          </label>
          <input
            type="file"
            id="input-file"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button className="post-create" onClick={handleCreatePOst}>
          Create Post
        </button>
        <div className="post-list">
          <span className="post-list__title">POSTED</span>
          {list.map((item: postsData, index: number) => (
            <CardPost
              userName={userInfo.name}
              avata={userInfo.avata}
              post={item.post}
              postTime={item.postTime}
              comments={2}
              delPost={() => handleDeletePOst(index)}
              editPost={() => handleEditPost(index)}
            />
          ))}
        </div>
      </div>
      <div className="blog">
        {blogsData.map((item) => (
          <PostBlog
            name={item.name}
            avata={item.avata}
            postTime={item.postTime}
            postContent={item.postContent}
            postMedia={item.postMedia}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockPage;
