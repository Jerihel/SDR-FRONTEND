import { UserRequestDto } from './../../../../models/UserRequestDto';
import { RequestEnacterDto } from './../../../../models/RequestEnacterDto';
import { RequestDto } from './../../../../models/RequestDto';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogueChildService } from 'src/app/services/catalogue-child.service';
import { Router } from '@angular/router';
import { UserRequestService } from 'src/app/services/user-request.service';

@Component({
  selector: 'app-patrocinadores-enacters',
  templateUrl: './patrocinadores-enacters.component.html',
  styleUrls: ['./patrocinadores-enacters.component.scss'],
})
export class PatrocinadoresEnactersComponent implements OnInit {
  catalogueChild: any[] = [];
  formPatrocinador!: FormGroup;
  apoyoEconomico!: string;

  constructor(
    private formBuilder: FormBuilder,

    private spinner: NgxSpinnerService,
    private router: Router,
    private solicitudService: UserRequestService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}
  private buildForm() {
    this.formPatrocinador = this.formBuilder.group({
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
      apoyo: ['', [Validators.required]],
      monto: [null],
      otro: [null],
      afterPatrocinio: ['', [Validators.required]],
    });

    this.formPatrocinador.get('apoyo')?.valueChanges.subscribe((value) => {
      if (value === 'S') {
        this.formPatrocinador
          .get('monto')
          ?.setValidators([
            Validators.required,
            Validators.pattern(/^[0-9]+([0-9]+)?$/),
          ]);
        this.formPatrocinador.get('otro')?.clearValidators();
        this.formPatrocinador.get('otro')?.setValue(null);
      } else {
        this.formPatrocinador
          .get('otro')
          ?.setValidators([
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(10),
          ]);
        this.formPatrocinador.get('monto')?.clearValidators();
        this.formPatrocinador.get('monto')?.setValue(null);
      }

      this.formPatrocinador.get('monto')?.updateValueAndValidity();
      this.formPatrocinador.get('otro')?.updateValueAndValidity();
    });
  }

  regresar() {
    this.router.navigate(['/home']);
  }

  generarSolicitud() {
    if (this.formPatrocinador.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor revise el fomulario para poder continuar',
      });

      return;
    }

    const patrocinador = this.formPatrocinador.value;

    const request1: RequestDto = {
      name: patrocinador.nombre,
      lastName: null,
      telephone: patrocinador.telefono,
      email: patrocinador.correo,
      requestType: 8,
      state: null,
      idReviwer: null,
      appointmentLocation: null,
      appointment: null,
      requestComment: null,
    };

    const request2: UserRequestDto = {
      campus: null,
      facultad: null,
      career: null,
      enacterDegree: null,
      interest: null,
      lookUp: null,
      financialSupport: patrocinador.apoyo,
      amount: patrocinador.monto,
      supportDetail: patrocinador.otro,
      adviserDegree: null,
      currenctActivity: null,
      hasExperience: null,
      experienceDetail: null,
      adviseOn: null,
      adviseWay: null,
      supportLookUp: patrocinador.afterPatrocinio,
    };

    const requestEnacter: RequestEnacterDto = {
      request: request1,
      userRequest: request2,
    };
    this.spinner.show();
    this.solicitudService
      .createUserRequest(requestEnacter)
      .toPromise()
      .then(
        (data) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Su solicitud ha sido enviada exitosamente',
          });
          this.router.navigate(['/home']);
        },
        (error) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error, por favor intente de nuevo',
          });
        }
      ).finally(() => {
        this.spinner.hide();
      });
  }
}
