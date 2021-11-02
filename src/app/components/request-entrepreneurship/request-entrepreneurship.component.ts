import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-request-entrepreneurship',
  templateUrl: './request-entrepreneurship.component.html',
  styleUrls: ['./request-entrepreneurship.component.scss']
})
export class RequestEntrepreneurshipComponent implements OnInit {

  checked = false;
  formRequest!: FormGroup;
  apoyoEconomico!: string;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService

  ) {
    this.buildForm();
  }

  ngOnInit(): void {}
  private buildForm() {
    this.formRequest = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(75),
          Validators.minLength(4),
        ],
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8),

          Validators.pattern(/^(0|\-?[1-9][0-9]*)$/),
        ],
      ],
      correo: ['', [Validators.required, Validators.email]],
      apoyo: [
        '',
        [
          Validators.required

        ],
      ],
      monto:[null],
      otro:[null],
      dateRequest: ["",[Validators.required]]


    });
  }

  regresar() {}

  generarSolicitud() {}


}
