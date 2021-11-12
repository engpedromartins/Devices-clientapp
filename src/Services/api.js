import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getDeviceApiList = async () =>
  api.get(`/devices`)

export const createDeviceApi = async (payload) =>
  api.post(`/devices`, { payload })

export const getDeviceApi = async (id) =>
  api.get(`/devices/${id}`)

export const editDeviceApi = async (device) => {
  console.log("device", device)
  const updatedDevice = {
    system_name: device.system_name,
    type: device.type,
    hdd_capacity: device.hdd_capacity
  }

  console.log("updated device", updatedDevice)

  api.put(`/devices/${device.id}`, updatedDevice)
}

export const deleteDeviceApi = async (id) =>
  api.delete(`/devices/${id}`)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getDeviceApiList,
  createDeviceApi,
  getDeviceApi,
  editDeviceApi,
  deleteDeviceApi
}