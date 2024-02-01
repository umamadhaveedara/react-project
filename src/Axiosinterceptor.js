import axios from "axios";

const config = axios.create({
  baseURL: "http://localhost:3500/api/v1/app", // our API base URL
});






// Request interceptor for accept the application
config.interceptors.request.use(
  (request) => {
    request.headers["Accept"] = "application/json";
    const token = localStorage.getItem('token');
    if(token){
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints



export const getUser = () => {
  return config.get('/Dashboard');
};
export const PostUserMain = (data) => {
  return config.post('/Dashboard',data);
};
export const passingLoginData = (data) => {
  return config.post('/login',data);
};
export const deleteUserMain = (id) => {
  return config.delete(`/Dashboard/${id}`);
};
export const PutUserMain = (id, data) => {
  return config.put(`/Dashboard/${id}`,data);
};

export default config
