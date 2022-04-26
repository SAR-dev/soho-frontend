export const setTokenToLocal = (token: string) => {
    localStorage.setItem("token", token)
}

export const removeTokenFromLocal = () => {
    localStorage.removeItem("token")
}