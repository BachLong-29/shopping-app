import HttpService from "@/core/services/httpService";
import { UserInfo } from "@/core/model/User";

class ProfileService extends HttpService {
  getUserInfo(): Promise<{ user: UserInfo }> {
    return this.get("/api/user", {});
  }
  getProfile(id: string): Promise<UserInfo> {
    return this.get(`/api/user/${id}`, {});
  }
  editUserProfile({
    id,
    name,
    birthdate,
    address,
    gender,
    phone,
  }: {
    id: string;
    name: string;
    birthdate: string;
    address: string;
    gender: string;
    phone: string;
  }) {
    return this.put(`api/user/${id}`, {
      name,
      birthdate,
      address,
      gender,
      phone,
    });
  }
}

const profileService = new ProfileService();

export default profileService;
