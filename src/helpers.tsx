import axios from "axios";
import { createChannelInterface, createPollInterface, createPostInterface, createSubChannelInterface } from "@interfaces/api";

export const getTokenFromLocal = () => {
  return localStorage.getItem("token");
};

export const removeTokenFromLocal = () => {
  localStorage.removeItem("token");
};

export const setTokenToLocal = (token: string) => {
  localStorage.setItem("token", token);
};

const defaultConfig = () => {
  const token = getTokenFromLocal()
  if (token) {
    const authConfig = {
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }
    return authConfig
  } else {
    const unAuthConfig = {
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return unAuthConfig
  }
}

// AUTH
export async function getLoggedInUser() {
  const { data } = await axios.get(`account/me/`, defaultConfig())
  return data
}

// COMMUNITY
export const getCommunity = async ({ username }: { username?: string }) => await axios.get(`group/${username}/`, defaultConfig())

// CHANNEL
export const getChannels = async ({ username }: { username?: string }) => await axios.get(`group/${username}/categories/`, defaultConfig())

export function createChannel({ username, data }: { username: string, data: createChannelInterface }): Promise<any> {
  return axios.post(`group/${username}/categories/create/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err }
    })
};

export function createSubChannel({ username, category, data }: { username: string, category: string, data: createSubChannelInterface }): Promise<any> {
  return axios.post(`group/${username}/categories/${category}/subcategory/create/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err }
    })
};

// IMAGE
export function imageUploader(img: File): Promise<any> {
  var formData = new FormData();
  formData.append("image", img);
  return axios.post(`image/create/`, formData, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err }
    })
};

// POST
export function createSubscriberPost({ username, data }: { username?: string, data: createPostInterface }): Promise<any> {
  return axios.post(`post/create/group/${username}/subscriber/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err }
    })
};

export function createAuthorPost({ username, data }: { username?: string, data: createPostInterface }): Promise<any> {
  return axios.post(`post/create/group/${username}/author/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err }
    })
};

export const getPostsFromType = async ({ username, type }: { username?: string, type?: string }) => await axios.get(`post/list/group/${username}/type/${type}/`, defaultConfig())

export const getPostsFromCategory = async ({ username, category }: { username?: string, category?: string }) => await axios.get(`post/list/group/${username}/category/${category}/`, defaultConfig())

export const getPostsFromSubCategory = async ({ username, sub_category }: { username?: string, sub_category?: string }) => await axios.get(`post/list/group/${username}/sub_category/${sub_category}/`, defaultConfig())

export const getPostDetails = async ({ id }: { id?: string }) => await axios.get(`post/${id}/`, defaultConfig())

// POLL
export function createPoll({ data }: { data: createPollInterface }): Promise<any> {
  return axios.post(`choice/create/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err }
    })
};

export function deletePoll(id: number): Promise<any> {
  return axios.delete(`choice/${id}/update/`, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err }
    })
};

export function selectPoll({ postId, pollId }: { postId: number, pollId: number }): Promise<any> {
  return axios.post(`post/${postId}/choice/vote/${pollId}/`, null, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err }
    })
};

// COMMENT
export function createComment({ postId, content }: { postId: number, content: string }): Promise<any> {
  return axios.post(`comment/create/post/${postId}/`, {content}, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err }
    })
};

// OTHERS
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

export const parseErrors = (data: { response: { data: { [x: string]: any; }; }; }) => {
  const keys = Object.keys(data.response.data)
  const msgs = keys.map(key => {
    const msg = data.response.data[key]
    return (msg[0])
  })
  return msgs
}
