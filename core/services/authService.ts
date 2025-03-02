import HttpService from "./httpService";

class AuthService extends HttpService {
  login(req: { email: string; password: string }) {
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
}

const authService = new AuthService();

export default authService;
