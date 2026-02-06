import smartApi from './smartApi';

export const getDataRequest = async(url, params, config = {}) => await smartApi.get(`${url}`, params, config = {});
export const postDataRequest = async(url, data, config = {}) => await smartApi.post(`${url}`, data, config = {});
export const putDataRequest = async(url, data, config = {}) => await smartApi.put(`${url}`, data, config = {});
export const patchDataRequest = async(url, data, config = {}) => await smartApi.patch(`${url}`, data, config = {});
export const deleteDataRequest = async(url, data, config = {}) => await smartApi.delete(`${url}`, data, config = {});
