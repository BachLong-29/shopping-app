import axios, { AxiosInstance } from "axios";

class HttpService {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retried &&
          originalRequest.url !== "/api/auth/refresh" &&
          originalRequest.url !== "/api/auth/login"
        ) {
          originalRequest._retried = true;

          if (this.isRefreshing) {
            return Promise.reject(error);
          }

          this.isRefreshing = true;
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/refresh`,
              {},
              { withCredentials: true },
            );
            this.isRefreshing = false;
            return this.axiosInstance.request(originalRequest);
          } catch {
            this.isRefreshing = false;
            if (typeof window !== "undefined") {
              // window.location.href = "/login";
            }
            return Promise.reject(error);
          }
        }

        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data || error.message);
        }
        return Promise.reject(error);
      },
    );
  }

  async get(url: string, params: unknown) {
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw error;
    }
  }

  async post(url: string, data: unknown) {
    try {
      const response = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw error;
    }
  }

  async put(url: string, data: unknown) {
    try {
      const response = await this.axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw error;
    }
  }

  async delete(url: string, data: unknown) {
    try {
      const response = await this.axiosInstance.delete(url, { data });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw error;
    }
  }

  async patch(url: string, data: unknown) {
    try {
      const response = await this.axiosInstance.patch(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw error;
    }
  }
}

export default HttpService;
