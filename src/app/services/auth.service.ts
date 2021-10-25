import { Injectable } from "@angular/core";
import { GeneralService } from "./general.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User, UserDto, UserResponse } from "../models/UserDto";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    private generalService: GeneralService,
    private http: HttpClient,
  ) {
  }

  getUserStored(): User {
    return JSON.parse(localStorage.getItem("user_info") as string);
  }

  isLoggedIn(): boolean {
    return !!this.getUserStored()
  }

  authUser(body: any) {
    return this.generalService.postData<UserResponse, any>(
      `${environment.api}/external/users/login`,
      body
    ).pipe(map((user) => {
      navigator.serviceWorker.controller?.postMessage({
        type: 'SET_TOKEN',
        token: user.token,
        api: environment.api
      });
      user.token = undefined;
      localStorage.setItem("user_info", JSON.stringify(user as User))
      return user as User;
    }));
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
    localStorage.removeItem("user_info");
    navigator.serviceWorker.controller?.postMessage({
      type: 'REMOVE_TOKEN'
    });
  }

  async getUserCredentials() {
    try {
      const userIp = await this.http
        .get<any>("https://api.ipify.org/?format=json")
        .toPromise();
      const userLogin = { login: this.getUserStored()?.username ?? "sdr_external" };
      return { ip: userIp.ip, login: userLogin?.login ?? userLogin };
    } catch (error) {
      return null;
    }
  }
}
