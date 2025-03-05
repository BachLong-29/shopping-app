import HttpService from "@/core/services/httpService";
import { UserInfo } from "@/core/model/User";

class ProfileService extends HttpService {
  getUserInfo(): Promise<{ user: UserInfo }> {
    return this.get("/api/user", {});
  }
}

const profileService = new ProfileService();

export default profileService;
