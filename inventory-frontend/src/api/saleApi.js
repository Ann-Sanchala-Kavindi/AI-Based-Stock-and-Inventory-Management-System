import api from "./axiosConfig"

export const getAllSales   = ()     => api.get("/api/sales")
export const getSaleById   = (id)   => api.get(`/api/sales/${id}`)
export const createSale    = (data) => api.post("/api/sales", data)
export const deleteSale    = (id)   => api.delete(`/api/sales/${id}`)