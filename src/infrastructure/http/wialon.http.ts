import axios from 'axios';

export const wialonHttp = axios.create({
  baseURL: 'https://hst-api.wialon.com/wialon/ajax.html',
  timeout: 10000
});
