import axios from "axios";

export const setTokenToLocal = (token: string) => {
  localStorage.setItem("token", token);
};

export const getTokenFromLocal = () => {
  return localStorage.getItem("token");
};

export const removeTokenFromLocal = () => {
  localStorage.removeItem("token");
};

export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

export const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const imgBBuploader = (img: File) => {
  var formData = new FormData();
  formData.append("image", img);
  return axios
    .post(
      `https://api.imgbb.com/1/upload?expiration=600&key=613ee68f6bc89f194d175614a4ca500f`,
      formData,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data;`,
        },
      }
    )
    .then((res) => {
      return res.data.data.image.url
    });
};