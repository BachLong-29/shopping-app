import axios, { AxiosInstance } from "axios";

class HttpService {
  private axiosIntance: AxiosInstance;

  constructor() {
    this.axiosIntance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async get(url: string, params: unknown) {
    try {
      const response = await this.axiosIntance.get(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async post(url: string, data: unknown) {
    try {
      const response = await this.axiosIntance.post(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async put(url: string, data: unknown) {
    try {
      const response = await this.axiosIntance.put(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async delete(url: string, data: unknown) {
    try {
      const response = await this.axiosIntance.delete(url, { data });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
  async patch(url: string, data: unknown) {
    try {
      const response = await this.axiosIntance.patch(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}

export default HttpService;
