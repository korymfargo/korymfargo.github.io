import { ActionLogout } from "@store";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const baseURL = "https://frontend-take-home-service.fetch.com/";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export const useAPIGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  axiosInstance.interceptors.response.use(
    (respnse: AxiosResponse) => respnse,
    (err: AxiosError) => {
      if (err.response?.status === 401) {
        console.error("Unauthorized! Session expired!");

        dispatch(ActionLogout());

        navigate("/login");
      }

      return Promise.reject(err);
    }
  );
};
