import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
});


axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error);
  if (error.response.data.message === 'jwt expired') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  return Promise.reject(error);
});

export default axiosInstance;