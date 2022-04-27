export const setTokenToLocal = (token: string) => {
    localStorage.setItem("token", token)
}

export const getTokenFromLocal = () => {
    return localStorage.getItem("token")
}

export const removeTokenFromLocal = () => {
    localStorage.removeItem("token")
}