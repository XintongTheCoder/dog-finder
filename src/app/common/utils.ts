import axios from 'axios';

const API_BASEURL = 'https://frontend-take-home-service.fetch.com';

export const client = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' },
});
