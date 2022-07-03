import { avatar, postRequest } from "model/post/post.model";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
import { logoutApi } from "services/authApi";
import { commentApi, PostApi, postAvatar } from "services/postApi";
import { resourceApi } from "services/resourceApi";
import { userInfo } from "model/auth/auth.model";
import { postData } from "model/post/post.model";
import { onGetUserInfo } from "redux/auth/auth.slice";
import { commentAction } from "redux/post/comment.slice";

interface IPost {
  userInfo: userInfo;
  onLogout: () => void;
  showForm: (e: boolean) => void;
  isShowForm: boolean;
  isEditForm: boolean;
  onChange: (e: any) => void;
  onCreatePost: () => void;
  onDeletePost: (id: string) => void;
  onEditPost: (id: string) => void;
  handleEditPost: () => void;
  post: postRequest;
  postList: any;
  onUploadFile: (e: any) => void;
  file: string;
  avatar: avatar;
  getPostData: () => void;
  onUploadAvatar: (e: any) => void;
  onSetUpAvatar: () => void;
  isSetupForm: boolean;
  showSetUpForm: (e: boolean) => void;
  getAllPost: () => void;
  newsData: any;
  comment: { name: string; value: string };
  onChangeComment: (e: any) => void;
  createComment: (postId: string) => void;
}
const usePost = (): IPost => {
  const initPostValue: postRequest = {
    title: "No Title",
    content: "",
    file: null,
  };
  const initCommentValue = {
    name: "",
    value: "",
  };
  const userInfo = useSelector((state: RootState) => state.auths.authInfo);

  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [isEditForm, setIsEditForm] = useState<boolean>(false);
  const [isSetupForm, setIsSetupForm] = useState<boolean>(false);
  const [post, setPost] = useState<postRequest>(initPostValue);
  const [id, setID] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const [postList, setPostList] = useState<postData[]>([]);
  const [avatar, setAvatar] = useState({ url: "", file: undefined });
  const [newsData, setNewsData] = useState([]);
  const [comment, setComment] = useState(initCommentValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      await logoutApi.postData();
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e: any) => {
    setPost({ ...post, content: e.target.value });
  };

  const showSetUpForm = (e: boolean) => {
    setIsSetupForm(e);
  };

  const showForm = (e: boolean) => {
    setIsShowForm(e);
    setIsEditForm(false);
    setFile("");
    setPost(initPostValue);
  };

  const onUploadAvatar = async (e: any) => {
    const avatar = e.target.files[0];
    console.log(avatar);
    const response = await resourceApi.uploadFile(avatar);
    if (response.status === 200) {
      console.log(response);
      setIsSetupForm(true);
      setAvatar({ ...avatar, url: response.data.url, file: e.target.files[0] });
    }
  };
  // setupavatar
  const onSetUpAvatar = async () => {
    console.log(123);
    const formData = new FormData();
    if (avatar.file) {
      formData.append("file", avatar.file);
      const response = await postAvatar(formData);
      if (response.status === 200) {
        onGetUserInfo(dispatch);
        setIsSetupForm(false);
      }
    }
  };

  const onUploadFile = async (e: any) => {
    const fileUpload = e.target.files;
    const response = await resourceApi.uploadFile(fileUpload[0]);
    if (response.status === 200) {
      setFile(response.data.url);
      setPost({ ...post, file: response.data._id });
    }
  };

  const onCreatePost = async () => {
    try {
      await PostApi.createPost(post);
      setPost(initPostValue);
      setFile("");
      getPostData();
      setIsShowForm(false);
      getAllPost();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeletePost = async (id: string) => {
    const response = await PostApi.deletePost(id);
    if (response.status === 200) {
      getPostData();
      getAllPost();
    }
  };

  const onEditPost = (id: string) => {
    setIsShowForm(true);
    setIsEditForm(true);
    setID(id);
  };

  const handleEditPost = async () => {
    const editData = { content: post.content, file: post.file };
    console.log(editData);
    const response = await PostApi.putPost(id, editData);
    if (response.status === 200) {
      getPostData();
      setIsShowForm(false);
      setIsEditForm(false);
      setPost(initPostValue);
      setFile("");
      getAllPost();
    }
  };

  // setupTime
  const setUptime = (time: string) => {
    const postTime = new Date(time);
    const thisTime = new Date();
    let result = "";
    if (thisTime.getFullYear() - postTime.getFullYear() > 0) {
      result = `${thisTime.getFullYear() - postTime.getFullYear()} year ago`;
    } else if (thisTime.getMonth() - postTime.getMonth() > 0) {
      result = `${thisTime.getMonth() - postTime.getMonth()} month ago`;
    } else if (thisTime.getDate() - postTime.getDate() > 0) {
      result = `${thisTime.getDate() - postTime.getDate()} day ago`;
    } else if (thisTime.getHours() - postTime.getHours() > 0) {
      result = `${thisTime.getHours() - postTime.getHours()} hours ago`;
    } else if (thisTime.getMinutes() - postTime.getMinutes() > 0) {
      result = `${thisTime.getMinutes() - postTime.getMinutes()} minutes ago`;
    } else {
      result = "a few moments";
    }
    return result;
  };

  //getMyPost
  const getPostData = async () => {
    const response = await PostApi.getMyPost(0, 10);
    if (response.status === 200) {
      // console.log(response);
      const postData = response.data.map((item: any) => ({
        id: item._id,
        content: item.content,
        file: item.file?.url,
        comments: item.comments,
        time: setUptime(item.updatedAt),
      }));
      setPostList(postData);
    }
  };

  // setup NEWs
  const getAllPost = async () => {
    const defaultAvatar = process.env.REACT_APP_DEFAULT_AVATAR;
    const response = await PostApi.getAllPost(0, 10);
    if (response.status === 200) {
      const newsData = response.data.map((item: any) => ({
        id: item._id,
        author: item.author.firstName + " " + item.author.lastName,
        avatar: defaultAvatar,
        content: item.content,
        file: item.file?.url,
        comments: 0,
        time: setUptime(item.updatedAt),
      }));

      setNewsData(newsData);
    }
  };
  const onChangeComment = (e: any) => {
    setComment({ name: e.target.name, value: e.target.value });
  };

  const createComment = async (postId: string) => {
    dispatch(
      commentAction.addComment({
        postId: postId,
        comment: { _id: "", content: comment.value },
        isDone: false,
      })
    );
    const response = await commentApi.createComment({
      content: comment.value,
      postId: postId,
    });
    if (response.status === 200) {
      console.log({ response });
      dispatch(
        commentAction.addComment({
          postId,
          comment: response.data,
          isDone: true,
        })
      );
      setComment(initCommentValue);
      // getAllPost();
    }
  };

  return {
    userInfo,
    onLogout,
    showForm,
    isShowForm,
    isEditForm,
    onCreatePost,
    onDeletePost,
    onEditPost,
    handleEditPost,
    onChange,
    onUploadFile,
    getPostData,
    onUploadAvatar,
    onSetUpAvatar,
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
  };
};

export default usePost;
