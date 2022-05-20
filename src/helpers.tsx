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
