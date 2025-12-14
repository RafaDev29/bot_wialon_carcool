import axios from 'axios';

export const carcoolHttp = axios.create({
  baseURL: 'http://dev.carcool.pe/gps-rest/api', 
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

carcoolHttp.interceptors.request.use(config => {
  const token = process.env.CARCOOL_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
