import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/UserDto';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  redirect: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
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
  }

  login(login: any) {
    if (this.loginForm.invalid) return;
    this.spinner.show();
    this.authService.authUser({ password: login.pass, username: login.email }).toPromise().then((res: User) => {
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
      this.router.navigate([this.redirect]);
    }).catch(error => {
      if ([406, 404].includes(error.status)) {
        Swal.fire({
          title: "Credenciales invalidas",
          text: "Por favor, revisa tu correo o contraseña.",
          icon: 'error'
        })
      } else {
        Swal.fire({
          title: "¡Error!",
          text: "Lo sentimos, ocurrio un error al intentar comunicarse con el servidor. Por favor, intenta de nuevo más tarde.",
          icon: 'error'
        })
      }
    }).finally(() => this.spinner.hide())
  }
}
