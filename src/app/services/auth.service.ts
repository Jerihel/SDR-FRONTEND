import { Injectable } from "@angular/core";
import { GeneralService } from "./general.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User, UserDto, UserProfile, UserResponse } from "../models/UserDto";
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
    );
  }

  createUser(usuario: UserDto) {
    return this.generalService.postData<User, UserDto>(
      `${environment.api}/internal/users/create`,
      usuario
    );
  }

  getUserProfile() {
    return this.generalService.getData<UserProfile>(
      `${environment.api}/internal/users/find`,
      this.getUserStored()?.username
    );
  }

  getUsers() {
    return this.generalService.getData<User>(
      `${environment.api}/internal/users/find`
    );
  }

  changePassword(oldPass: string, newPass: string) {
    return this.generalService.patchData(
      environment.api, 'internal/users/change/password',
      { oldPass, newPass, username: this.getUserStored()?.username }
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
