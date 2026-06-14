import api from "./axiosConfig";

export const getAllProducts= () =>api.get("/products")