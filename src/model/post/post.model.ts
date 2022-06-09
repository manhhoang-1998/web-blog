export interface postRequest {
  title: string;
  content: string;
  file: string | null;
}
export interface editRequest {
  content: string;
  file?: string | null;
}

export interface commentRequest {
  content: string;
  postId: string;
}

export interface postData {
  id: string;
  content: string;
  file: string;
  time: string;
  comments: string[];
}

export interface avatar {
  url: string;
  file: any;
}
