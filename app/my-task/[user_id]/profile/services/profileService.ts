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
    ...data
  }: Omit<UserInfo, "_id" | "role"> & {
    id: string;
  }) {
    return this.put(`api/user/${id}`, { ...data });
  }
}

const profileService = new ProfileService();

export default profileService;
