import api from "./axiosConfig"

export const loginUser = (credentials) => api.post("/login", credentials)