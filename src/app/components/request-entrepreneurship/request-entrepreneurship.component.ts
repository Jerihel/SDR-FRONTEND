import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestDto } from 'src/app/models/RequestDto';
import { EntrepreneurRequestDto } from 'src/app/models/entrepreneurRequestDto';
import Swal from 'sweetalert2';
import { EntrepreneurReqeustService } from 'src/app/services/entrepreneur-request.service';
import { RequestEntrepreneurDto } from 'src/app/models/RequestEntrepreneurDto';
import { environment } from 'src/environments/environment';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-request-entrepreneurship',
  templateUrl: './request-entrepreneurship.component.html',
  styleUrls: ['./request-entrepreneurship.component.scss']
})
export class RequestEntrepreneurshipComponent implements OnInit {

  checked = false;
  formRequest!: FormGroup;
  requisitos: any;
  ubicaciones: any;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private entrepreneurRequestService: EntrepreneurReqeustService,
    private router: Router,
    private generalService: GeneralService
  ) {
    this.buildForm();
  }

  async ngOnInit() {

    this.spinner.show();
    try {
      this.requisitos = await this.generalService.getData(`${environment.api}/external/catalogue/getBy/12`).toPromise();
      this.ubicaciones = await this.generalService.getData(`${environment.api}/external/catalogue/getBy/13`).toPromise();
    } catch (error) {
      console.log(error);
    }
    this.spinner.hide();
  }

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
      aboutUs: ["", Validators.required],
      requerimiento: [
        '',
        [
          Validators.required
        ],
      ],
      ubicacion: ['', Validators.required],
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
        text: 'Por favor, revise el formulario para poder continuar',
      });
      return;
    }

    this.spinner.show();

    const formulario = this.formRequest.value;

    const request1: RequestDto = {
      name: formulario.nombre,
      telephone: formulario.telefono,
      email: formulario.correo,
      requestType: 2,
      state: 9,
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

    console.log(requestEntrepreneur);

    this.entrepreneurRequestService
      .createEntrepreneurRequest(requestEntrepreneur)
      .toPromise()
      .then((res) => {
        Swal.fire({
          title: 'Solicitud enviada',
          icon: 'success',
          text: 'La solicitud ha sido creada exitosamente. Pronto nos comunicaremos contigo.',
          confirmButtonColor: '#2b317f',
          confirmButtonText: 'Aceptar',
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
          confirmButtonColor: '#2b317f',
          confirmButtonText: 'Aceptar',
        });
      }).finally(() => {
        this.spinner.hide();
      });
  }

}
