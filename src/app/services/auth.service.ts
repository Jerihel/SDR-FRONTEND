import { Injectable } from "@angular/core";
import { GeneralService } from "./general.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { User, UserDto } from "../models/UserDto";
import { AlertUtils } from "../utils/alert-utils";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private generalService: GeneralService,
    private http: HttpClient,
    private router: Router
  ) {
    if (this.getUserStored() && !this.isLoggedIn()) {
      this.logout();
      AlertUtils.showToast(
        "error",
        "Token expirado",
        "Por favor, inicie sesión para continuar."
      );
      this.router.navigate(["/login"]);
    }
  }

  getUserStored(): User {
    return JSON.parse(localStorage.getItem("user_info"));
  }

  isLoggedIn(): boolean {
    return !jwtHelper.isTokenExpired(
      this.getUserStored()?.token.replace("Bearer ", "")
    );
  }

  saveUserToken(user: User) {
    localStorage.setItem("user_info", JSON.stringify(user));
  }

  authUser(body) {
    return this.generalService.postData<User, any>(
      `${environment.api}/external/users/login`,
      body
    );
  }

  createUser(usuario: UserDto) {
    return this.generalService.postData<User, UserDto>(
      `${environment.api}/internal/users/create`,
      usuario
    );
  }

  getUserProfile() {
    return this.generalService.getData<User>(
      `${environment.api}/internal/users/find`,
      this.getUserStored()?.username
    );
  }

  getUsers() {
    return this.generalService.getData<User>(
      `${environment.api}/internal/users/find`
    );
  }

  logout() {
    localStorage.removeItem('user_info');
  }

  async getUserCredentials() {
    try {
      const userIp = await this.http
        .get<any>("https://api.ipify.org/?format=json")
        .toPromise();
      const userLogin = { login: this.getUserStored()?.username ?? "ssem_ex" };
      return { ip: userIp.ip, login: userLogin.login };
    } catch (error) {
      return null;
    }
  }
}
