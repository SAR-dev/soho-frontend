import axios from "axios";
import { AvatarUpdateInterface, CommunityUpdateInterface, createChannelInterface, createPollInterface, createPostInterface, createSubChannelInterface, MeUpdateInterface, relocateSubChannelInterface, UpdateRulesInterface } from "@interfaces/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { serialize } from 'object-to-formdata';

dayjs.extend(relativeTime)

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

export function updateAvatarOfLoggedInUser({ data }: { data: AvatarUpdateInterface }): Promise<any> {
  return axios.put(`account/avatar/`, serialize(data), defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function updateLoggedInUser({ data }: { data: MeUpdateInterface }): Promise<any> {
  return axios.put(`account/me/`, serialize(data), defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};


// NOTIFICATIONS
export const getNotifications = async () => await axios.get(`activity/notifications/`, defaultConfig())

export const getClapsCount = async () => await axios.get(`activity/claps/`, defaultConfig())

export const getLatestActivity = async ({ username }: { username?: string }) => await axios.get(`activity/list/${username}/`, defaultConfig())

export function markNotificationDone(id: number): Promise<any> {
  return axios.post(`activity/notifications/${id}/done/`, null, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function markAllNotificationDone(): Promise<any> {
  return axios.post(`activity/notifications/done/`, null, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};


// COMMUNITY
export const getCommunity = async ({ username }: { username?: string }) => await axios.get(`group/${username}/`, defaultConfig())

export const searchCommunity = async ({ text }: { text?: string }) => await axios.get(`group/subscribed?${text}`, defaultConfig())

export const getCommunityRules = async ({ username }: { username?: string }) => await axios.get(`group/${username}/rules/`, defaultConfig())

export const getSubscribedList = async () => await axios.get(`group/subscribed/`, defaultConfig())

export const getLeaderboard = async ({ username, timespan }: { username?: string, timespan: string }) => await axios.get(`group/${username}/leaderboard/${timespan}/`, defaultConfig())

export function subscribe({ username }: { username: string }): Promise<any> {
  return axios.post(`group/${username}/subscribe/`, null, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function unsubscribe({ username }: { username: string }): Promise<any> {
  return axios.delete(`group/${username}/subscribe/`, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function getUpdateCommunity({ username }: { username?: string }): Promise<any> {
  return axios.get(`group/${username}/update/`, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function updateCommunity({ username, data }: { username?: string, data: CommunityUpdateInterface }): Promise<any> {
  return axios.put(`group/${username}/update/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function updateCommunityRules ({ username, data }: { username?: string, data: UpdateRulesInterface }): Promise<any> {
  return axios.put(`group/${username}/rules/update/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

// CHANNEL
export const getChannels = async ({ username }: { username?: string }) => await axios.get(`group/${username}/categories/`, defaultConfig())

export function createChannel({ username, data }: { username: string, data: createChannelInterface }): Promise<any> {
  return axios.post(`group/${username}/categories/create/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function createSubChannel({ username, category, data }: { username: string, category: string, data: createSubChannelInterface }): Promise<any> {
  return axios.post(`group/${username}/categories/${category}/subcategory/create/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function relocateSubChannel({ username, sub_category, data }: { username: string, sub_category: string, data: relocateSubChannelInterface }): Promise<any> {
  return axios.put(`group/${username}/subcategory/${sub_category}/relocate/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
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
      return { error: err.response.data }
    })
};

// POST
export function createSubscriberPost({ username, data }: { username?: string, data: createPostInterface }): Promise<any> {
  return axios.post(`post/create/group/${username}/subscriber/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function createAuthorPost({ username, data }: { username?: string, data: createPostInterface }): Promise<any> {
  return axios.post(`post/create/group/${username}/author/`, data, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function bookmarkPost(id: number): Promise<any> {
  return axios.post(`post/${id}/bookmark/`, null, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function unBookmarkPost(id: number): Promise<any> {
  return axios.delete(`post/${id}/bookmark/`, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function votePost(id: number): Promise<any> {
  return axios.post(`post/${id}/vote/`, null, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function addAwardToPost({ postId, awardId }: { postId: number, awardId: number }): Promise<any> {
  return axios.post(`post/${postId}/award/${awardId}/free/`, null, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

{/* <int:pk>/award/<int:id>/free/ */ }

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
      return { error: err.response.data }
    })
};

export function deletePoll(id: number): Promise<any> {
  return axios.delete(`choice/${id}/update/`, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function selectPoll({ postId, pollId }: { postId: number, pollId: number }): Promise<any> {
  return axios.post(`post/${postId}/choice/vote/${pollId}/`, null, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

// COMMENT
export function createComment({ postId, content }: { postId: number, content: string }): Promise<any> {
  return axios.post(`comment/create/post/${postId}/`, { content }, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function createReply({ postId, commentId, content }: { postId: number, commentId: number, content: string }): Promise<any> {
  return axios.post(`comment/create/post/${postId}/parent/${commentId}/`, { content }, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export function voteComment(id: number): Promise<any> {
  return axios.post(`comment/${id}/vote/`, null, defaultConfig())
    .then((res) => {
      return { data: res.data }
    })
    .catch((err) => {
      return { error: err.response.data }
    })
};

export const getComments = async ({ postId }: { postId?: number }) => await axios.get(`comment/list/post/${postId}/`, defaultConfig())

// OTHERS
export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const parseErrors = (data: any) => {
  const keys = Object.keys(data)
  const msgs = keys.map(key => {
    const msg = data[key]
    if (Array.isArray(msg)) {
      return (msg[0])
    } else {
      return msg
    }
  })
  return msgs
}

export const doubleDigit = (num: number) => ("0" + num).slice(-2);

export const timeLengthToSeconds = (time_length: string) => {
  const pattern = "^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$"
  if (time_length.match(pattern)) {
    const a = time_length.split(':');
    const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return seconds
  } else {
    const [day, time] = time_length.split(' ');
    const a = time.split(':');
    const time_seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    const day_seconds = (+day) * 60 * 60 * 24
    return (time_seconds + day_seconds)
  }
}

export const getPostKey = (params: string | undefined) => {
  if (params === "pType") return "type_posts"
  if (params === "cName") return "cat_posts"
  if (params === "sName") return "sub_cat_posts"
  if (params === undefined) return "type_posts"
}

export const checkIfExpired = ({ duration, created_at }: { duration: string | null, created_at: Date }) => {
  if (!duration) return false
  const expired = dayjs(dayjs()).diff(created_at, 'second', true) > timeLengthToSeconds(duration)
  if (expired) {
    return true
  } else {
    return false
  }
}

export const shortenText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'
  } else {
    return text.substring(0, maxLength)
  }
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function mapOrder({ array, order, key }: { array: any[], order: number[], key: string }) {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key];

    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });

  return array;
}

export function uniqueId(): string {
  return 'id' + (new Date()).getTime()
}