import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

export const axiosSecure = axios.create({
  baseURL: "https://sge-project-server.vercel.app",
});
const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
     async (error) => {
        const status = error.response.status;
        console.log('status err' ,status)
        // for 401 or 403 logout the user and move the user to the login page 
        if(status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
