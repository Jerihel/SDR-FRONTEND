import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/modules/UserDto';
import { GeneralService } from 'src/app/services/general.service';
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

  constructor(
    private generalService: GeneralService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    localStorage.setItem('section', 'login');
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {

  }

  login(login) {
    this.spinner.show();
    this.generalService.postData(`${environment.api}/external/users/login`, {
      "password": login.pass,
      "username": login.email
    }).toPromise().then((res: User) => {
      console.log(res);
      localStorage.setItem("user_info", JSON.stringify(res))
      this.router.navigate(['/'])
    }).catch(error => {
      Swal.fire({
        text: "Credenciales invalidas.",
        icon: 'error'
      })
    }).finally(() => this.spinner.hide())
  }
}
