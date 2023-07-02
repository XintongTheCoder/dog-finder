import axios from 'axios';

const API_BASEURL = 'https://frontend-take-home-service.fetch.com';

export const client = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
});
