import Api from "./api";

export const resourceApi = {
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return Api.post("/resource/upload/image-public", formData);
  },
};
