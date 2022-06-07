import axios from "axios";
import { createChannelInterface, createSubChannelInterface } from "./interfaces";

interface Header {
  [key: string]: string;
}

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
export async function getCommunity(username?: string) {
  const { data } = await axios.get(`group/${username}/`, defaultConfig())
  return data
}

// Channel
export async function getChannels(username?: string) {
  const { data } = await axios.get(`group/${username}/categories/`, defaultConfig())
  return data
}

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
