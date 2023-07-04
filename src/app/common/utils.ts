import axios from 'axios';
import { useAppDispatch } from '@/lib/redux/hooks';
import { updateUserLogin } from '@/lib/redux/slices/userSlice';

const API_BASEURL = 'https://frontend-take-home-service.fetch.com';

axios.interceptors.response.use((response) => {
  const dispatch = useAppDispatch();
  if (response.status === 401) {
    dispatch(updateUserLogin(false));
  }
  return response;
});

export const client = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' },
});
