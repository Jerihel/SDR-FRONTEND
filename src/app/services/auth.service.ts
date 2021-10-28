import { Injectable } from "@angular/core";
import { GeneralService } from "./general.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User, UserCreated, UserDetail, UserDto, UserProfile, UserResponse } from "../models/UserDto";
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
    return this.generalService.postData<UserCreated, UserDto>(
      `${environment.api}/internal/users/create`,
      usuario
    );
  }

  getUserProfile(username?: string) {
    return this.generalService.getData<UserProfile>(
      `${environment.api}/internal/users/find`,
      username ?? this.getUserStored()?.username
    );
  }

  getUsers() {
    return this.generalService.getData<UserDetail[]>(
      `${environment.api}/internal/users/find`
    );
  }

  changePassword(oldPass: string, newPass: string) {
    return this.generalService.patchData(
      environment.api, 'internal/users/change/password',
      { oldPass, newPass, username: this.getUserStored()?.username }
    );
  }

  updateUser(body: any, username: string) {
    return this.generalService.patchData(
      `${environment.api}/internal/users/edit`, username,
      body
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
