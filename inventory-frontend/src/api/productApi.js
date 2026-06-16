import api from "./axiosConfig";

export const getAllProducts= () =>api.get("/products")
export const getProductById = (id)=> api.get("/products/${id}")
export const create=() =>api.post("/categories/${category-id}/products",data)
export const updateById=(id) =>api.put("/products/${id}",data)
export const deleteById=(id) =>api.delete("/products/${id}")