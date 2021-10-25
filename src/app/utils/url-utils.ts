import { HttpHeaders } from "@angular/common/http";
import { Param } from "../models/Params";
import { User } from "../models/UserDto";

export class UrlUtils {
  static toQueryParams(params: any): string {
    if (params.length == 1) return `?${params[0].key}=${params[0].value}`;
    return params.reduce(
      (accumulator, currentValue) =>
        `${accumulator.value
          ? `?${accumulator.key}=${accumulator.value}`
          : accumulator
        }&${currentValue.key}=${currentValue.value}`
    );
  }

  static toHeaders(params?: Param[], addToken = true): HttpHeaders {
    var headers = new HttpHeaders();
    if (addToken) {
      const user: User = JSON.parse(localStorage.getItem("user_info"));
      if (user) headers = headers.append("Authorization", user.token);
      params?.forEach((param) => {
        headers = headers.append(param.key, param.value);
      });
    }
    return headers;
  }
}
