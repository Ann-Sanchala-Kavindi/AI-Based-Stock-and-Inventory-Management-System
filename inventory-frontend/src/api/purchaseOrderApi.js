import api from "./axiosConfig"

export const getAllOrders   = ()             => api.get("/purchase-orders")
export const getOrderById   = (id)           => api.get(`/purchase-orders/${id}`)
export const createOrder    = (data)         => api.post("/purchase-orders", data)
export const updateOrderStatus = (id, status) =>
  api.patch(`/purchase-orders/${id}/status?status=${status}`)