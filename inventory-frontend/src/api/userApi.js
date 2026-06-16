import api from "./axiosConfig"


export const createManager    = (data)     => api.post("/admin/register-manager", data)
export const deleteManager    = (id)       => api.delete(`/admin/managers/${id}`)
export const toggleManager    = (id)       => api.put(`/admin/managers/${id}/toggle`)

export const getAllManagers  = ()     => api.get("/managers")