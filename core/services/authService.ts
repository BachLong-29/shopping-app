import HttpService from "./httpService";
import { UserInfo } from "../model/User";

class AuthService extends HttpService {
  constructor() {
    super();
  }
  login(req: { email: string; password: string }): Promise<{ user: UserInfo }> {
    const { email, password } = req;
    return this.post("/api/auth/login", { email, password });
  }
  register(req: { email: string; password: string; name: string }) {
    const { email, password, name } = req;
    return this.post("/api/auth/register", { email, password, name });
  }
  logout() {
    return this.post("/api/auth/logout", {});
  }
  me(): Promise<{ user: UserInfo }> {
    return this.get("/api/auth/me", {});
  }
}

const authService = new AuthService();

export default authService;
