import axios from "axios";

const config = axios.create({
  baseURL: "http://localhost:3500/api/v1/app/Dashboard", // our API base URL
});


const token = JSON.parse(localStorage.getItem('myData'));



// Request interceptor for accept the application
config.interceptors.request.use(
  (request) => {
    request.headers["Accept"] = "application/json";
    request.headers["Authorization"] = `Bearer ${token.token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints



export const getUser = () => {
  return config.get();
};
export const PostUserMain = (data) => {
  return config.post('',data);
};
export const deleteUserMain = (id) => {
  return config.delete(`/${id}`);
};
export const PutUserMain = (id, data) => {
  return config.put(`/${id}`,data);
};

export default config
