import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/UserDto';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  redirect: string | null = null;
  userLogged: User | null = null;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
  ) {

    localStorage.setItem('section', 'login');
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has("redirect")) {
        this.redirect = params.get("redirect");
      }
    })

    navigator.serviceWorker.onmessage = (event) => {
      if (event.data.type == 'TOKEN_SET') {
<<<<<<< HEAD
        this.spinner.hide();
        localStorage.setItem("user_info", JSON.stringify(this.userLogged));
        this.router.navigate([this.redirect]);
=======
        localStorage.setItem("user_info", JSON.stringify(this.userLogged));
        location.href = this.redirect as string;
        this.spinner.hide();
>>>>>>> 69b5d91c28dcaa831f1df6dd1b6fbc63439a49e6
      }
    }
  }

  async login(login: any) {
    if (this.loginForm.invalid) return;
    this.spinner.show();
    try {
      const res = await this.authService.authUser({ password: login.pass, username: login.email }).toPromise();
      if (res.roles.find(item => item.idRole == 4)) {
        this.redirect = this.redirect ?? '/admin/users';
        localStorage.setItem("section", "users");
      } else {
        this.redirect = this.redirect ?? '/home';
        localStorage.setItem("section", "home");
      }
      if (this.redirect?.includes('login')) {
        this.redirect = '/home';
        localStorage.setItem("section", "home");
      }
      navigator.serviceWorker.controller?.postMessage({
        type: 'SET_TOKEN',
        token: res.token,
        api: environment.api
      });
      res.token = undefined;
      this.userLogged = res;
    } catch (error: any) {
      this.spinner.hide();

      if ([406, 404].includes(error.status)) {
        Swal.fire({
          title: "Credenciales invalidas",
          text: "Por favor, revisa que el usuario y la contraseña sean los correctos.",
          icon: 'error',
          confirmButtonColor: '#2b317f'
        })
      } else {
        Swal.fire({
          title: "¡Error!",
          text: "Lo sentimos, ocurrio un error al intentar comunicarse con el servidor. Por favor, intenta de nuevo más tarde.",
          icon: 'error',
          confirmButtonColor: '#2b317f'
        })
      }
      this.redirect = null;
    }
  }
}