import axios from 'axios';

const api = process.env.REACT_APP_RECORDS_API_URL || "http://5af90fb2b3606600140c1b1b.mockapi.io";

export const getAll = () => axios.get(`${api}/api/v1/records`);

export const addRecords = (params) => axios.post(`${api}/api/v1/records`, params);

export const updateRecords = (params) => axios.put(`${api}/api/v1/records/${params.id}`, params);

export const removeRecords = (id) => axios.delete(`${api}/api/v1/records/${id}`);
