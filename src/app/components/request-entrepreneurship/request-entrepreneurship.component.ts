import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestDto } from 'src/app/models/RequestDto';
import { EntrepreneurRequestDto } from 'src/app/models/entrepreneurRequestDto';
import Swal from 'sweetalert2';
import { EntrepreneurReqeustService } from 'src/app/services/entrepreneur-request.service';
import { RequestEntrepreneurDto } from 'src/app/models/RequestEntrepreneurDto';

@Component({
  selector: 'app-request-entrepreneurship',
  templateUrl: './request-entrepreneurship.component.html',
  styleUrls: ['./request-entrepreneurship.component.scss']
})
export class RequestEntrepreneurshipComponent implements OnInit {

  checked = false;
  formRequest!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private entrepreneurRequestService: EntrepreneurReqeustService,
    private router: Router

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
      correo: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8),

          Validators.pattern(/^(0|\-?[1-9][0-9]*)$/),
        ],
      ],
      aboutUs: ["",[Validators.required]],

      requerimiento: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(10),
        ],
      ],

      ubicacion: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(10),
        ],
      ],

      detalle: [
        '',
        [
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(10),
        ],
      ],


    });
  }

  regresar() {
    this.router.navigate(['/home']);
  }

  generarSolicitud() {
    if (this.formRequest.invalid) {
      Swal.fire({
        title: 'Formulario invalido',
        icon: 'error',
        text: 'por favor revise el formulario para poder continuar',
      });
      return;
    }

    const formulario = this.formRequest.value;

    const request1: RequestDto = {
      name: formulario.nombre,
      telephone: formulario.telefono,
      email: formulario.correo,
      requestType: 0,
      state: 0,
      lastName: null,
      idReviwer: null,
      appointmentLocation: null,
      appointment: null,
      requestComment: null
    };

    const formulario2: EntrepreneurRequestDto = {
      aboutUs: formulario.aboutUs,
      contextLocation: formulario.ubicacion,
      details: formulario.detalle,
      requirements: formulario.requerimiento
   };
    console.log(request1);

    const requestEntrepreneur: RequestEntrepreneurDto = {
      request: request1,
      entrepreneurRequest: formulario2,
    };

    this.entrepreneurRequestService
    .createEntrepreneurRequest(requestEntrepreneur)
    .toPromise()
    .then((res) => {
      Swal.fire({
        title: 'Solicitud enviada',
        icon: 'success',
        text: 'Pronto nos comunicaremos con usted',
      }).then((res) => {
        if (res.value) {
          this.router.navigate(['/home']);
        }
      });
    })
    .catch((error) => {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Error al realizar la operacion por favor intente mas tarde',
      });
    });
}

}
