import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

axios.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  return req;
});

axios.interceptors.response.use((res: AxiosResponse) => {
  if (
    res.status === 500 ||
    res.status === 502 ||
    res.status === 503 ||
    res.status === 504
  ) {
    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/")
        toast.error("Sunucu ile bağlantı kurulamadı. Yönlendiriliyorsunuz...");

      else toast.error("Sunucu ile bağlantı kurulamadı.");

      setTimeout(async () => {
        window.location.href = "/";
      }, 2000);
    }
  }
  return res;
});

export default axios;
