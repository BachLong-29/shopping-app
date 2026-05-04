import HttpService from "./httpService";
import { UserInfo } from "../model/User";

class SettingService extends HttpService {
  constructor() {
    super();
  }

  getUserSetting(req: { userId: string }): Promise<any> {
    const { userId } = req;
    return this.get(`/api/${userId}/settings`, {});
  }

  updateSetting(req: {
    userId: string;
    setting: {
      theme?: "light" | "dark" | "system";
      language?: string;
      address: {
        country?: string;
        city?: string;
        street?: string;
        postalCode?: string;
      };
    };
  }): Promise<any> {
    const { userId, setting } = req;
    return this.post(`/api/${userId}/settings`, { ...setting });
  }
}

const authService = new SettingService();

export default authService;
