import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { Param } from "../modules/Params";
import { UrlUtils } from "../utils/url-utils";

@Injectable({
  providedIn: "root",
})
export class GeneralService {
  constructor(protected html: HttpClient) { }

  getData<R>(
    baseUrl: string,
    params?: string | string[] | Param[],
    headers?: Param[]
  ) {
    return this.html.get<R>(this.createUrl(baseUrl, params), {
      headers: UrlUtils.toHeaders(headers, baseUrl.includes('internal')),
    });
  }

  postData<R, B>(baseUrl: string, body?: B, headers?: Param[]) {
    return this.html.post<R>(baseUrl, body, {
      headers: UrlUtils.toHeaders(headers, baseUrl.includes('internal')),
    });
  }

  putData<R, B>(
    baseUrl: string,
    params?: string | string[] | Param[],
    body?: B,
    headers?: Param[]
  ) {
    return this.html.put<R>(this.createUrl(baseUrl, params), body, {
      headers: UrlUtils.toHeaders(headers, baseUrl.includes('internal')),
    });
  }

  deleteData<R>(
    baseUrl: string,
    params?: string | string[] | Param[],
    headers?: Param[]
  ) {
    return this.html.delete<R>(this.createUrl(baseUrl, params), {
      headers: UrlUtils.toHeaders(headers, baseUrl.includes('internal')),
    });
  }

  createUrl(baseUrl: string, params: string | string[] | Param[]): string {
    if (!params) return baseUrl;
    if (typeof params == "string" || typeof params == "number")
      return `${baseUrl}/${params}`;
    if (params[0] instanceof Param)
      return `${baseUrl}${UrlUtils.toQueryParams(params)}}`;
    else return `${baseUrl}/${params.join("/")}`;
  }

  showToast(icon?: SweetAlertIcon, title?: string, text?: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({ icon, title, text });
  }
}
