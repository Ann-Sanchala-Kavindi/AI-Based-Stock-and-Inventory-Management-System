import api from "./axiosConfig";

export const getAllProducts= () =>api.get("/products")
export const getProductById = (id)=> api.get(`/products/${id}`)
export const getProductsByCategory = (catId)    => api.get(`/categories/${catId}/products`)
export const createProduct=(catId, data) =>api.post(`/categories/${catId}/products`, data)
export const updateProduct=(id, data) =>api.put(`/products/${id}`, data)
export const deleteProduct=(id) =>api.delete(`/products/${id}`)