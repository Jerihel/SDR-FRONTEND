import { RequestEnacterDto } from './../../../../models/RequestEnacterDto';
import { UserRequestDto } from './../../../../models/UserRequestDto';
import { RequestDto } from './../../../../models/RequestDto';
import { CatalogueChild } from 'src/app/models/CatalogueChild';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogueChildService } from 'src/app/services/catalogue-child.service';
import { ValidadorPersonalizado } from 'src/app/utils/ValidadorPersonalizado';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserRequestService } from 'src/app/services/user-request.service';
@Component({
  selector: 'app-form-enacter',
  templateUrl: './form-enacter.component.html',
  styleUrls: ['./form-enacter.component.scss'],
})
export class FormEnacterComponent implements OnInit {
  formEnacterUser!: FormGroup;
  apoyoEconomico!: string;
  catalogueSede!: CatalogueChild[];
  catalogueCarreras!: CatalogueChild[];
  catalogueFacultad!: CatalogueChild[];
  catalogueInteres!: CatalogueChild[];
  catalogueExpectavias!: CatalogueChild[];
  constructor(
    private formBuilder: FormBuilder,
    private catalogueChildService: CatalogueChildService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private serviceRequest: UserRequestService
  ) {
    this.buildForm();
  }

  async ngOnInit() {
    try {
      this.spinner.show();
      await this.getCatalogoSede();
      await this.getCatalogoFacultad();
      await this.getCatalogoCarreras();
      await this.getCatalogoInteres();
      await this.getCatalogoExpectavias();
    } catch (err) {
      Swal.fire({
        title: 'Oops...',
        text: 'Error al generar el formulario por favor intente mas tarde',
        icon: 'error',
        confirmButtonColor: '#2b317f',
      }).then((res) => {
        if (res) {
          this.regresar();
        }
      });
    }

    this.spinner.hide();
  }
  private buildForm() {
    this.formEnacterUser = this.formBuilder.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.email,
          ValidadorPersonalizado.correoUmg,
        ],
      ],
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
      sede: ['', [Validators.required]],
      facultad: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
      ciclo: ['', [Validators.required]],
      intereses: ['', [Validators.required]],

      formarParte: ['', Validators.required],
    });
  }

  regresar() {
    this.router.navigate(['/home']);
  }

  generarSolicitud() {
    if (this.formEnacterUser.invalid) {
      Swal.fire({
        title: 'Oops...',
        text: 'Por favor llene todos los campos',
        icon: 'error',
        confirmButtonColor: '#2b317f',
      });
      return;
    }

    const request = this.formEnacterUser.value;
    const form1: RequestDto = {
      name: request.nombre,
      lastName: null,
      telephone: request.telefono,
      email: request.correo,
      requestType: 2,
      state: 9,
      idReviwer: null,
      appointmentLocation: null,
      appointment: null,
      requestComment: null,
    };

    const form2: UserRequestDto = {
      campus: request.sede,
      facultad: request.facultad,
      career: request.carrera,
      enacterDegree: request.ciclo,
      interest: request.intereses,
      lookUp: request.formarParte,
      financialSupport: null,
      amount: null,
      supportDetail: null,
      adviserDegree: null,
      currenctActivity: null,
      hasExperience: null,
      experienceDetail: null,
      adviseOn: null,
      adviseWay: null,
      supportLookUp: null,
    };

    const solicitud: RequestEnacterDto = {
      request: form1,
      userRequest: form2,
    };

    this.serviceRequest
      .createUserRequest(solicitud)
      .toPromise()
      .then((res) => {
        Swal.fire({
          title: 'Solicitud enviada',
          text: 'Su solicitud ha sido enviada con exito',
          icon: 'success',
          confirmButtonColor: '#2b317f',
        }).then((res) => {
          if (res) {
            this.regresar();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Oops...',
          text: 'Error al crear la solicitud',
          icon: 'error',
          confirmButtonColor: '#2b317f',
        });
      });
  }

  async getCatalogoSede() {
    await this.catalogueChildService
      .getAllCatalogueChildByParent(5)
      .toPromise()
      .then((res) => {
        this.catalogueSede = res;
      });
    // .catch((err) => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Error al generar el formulario por favor intente mas tarde',
    //     confirmButtonColor: '#2b317f',
    //   }).then((res) => {
    //     if (res.value) {
    //       this.regresar();
    //     }
    //   });
    // });
  }

  async getCatalogoFacultad() {
    await this.catalogueChildService
      .getAllCatalogueChildByParent(6)
      .toPromise()
      .then((res) => {
        this.catalogueFacultad = res;
      });
    // .catch((err) => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Error al generar el formulario por favor intente mas tarde',
    //     confirmButtonColor: '#2b317f',
    //   }).then((res) => {
    //     if (res.value) {
    //       this.regresar();
    //     }
    //   });
    // });
  }

  async getCatalogoCarreras() {
    await this.catalogueChildService
      .getAllCatalogueChildByParent(7)
      .toPromise()
      .then((res) => {
        this.catalogueCarreras = res;
      });
    // .catch((err) => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Error al generar el formulario por favor intente mas tarde',
    //     confirmButtonColor: '#2b317f',
    //   }).then((res) => {
    //     if (res.value) {
    //       this.regresar();
    //     }
    //   });
    // });
  }

  async getCatalogoInteres() {
    await this.catalogueChildService
      .getAllCatalogueChildByParent(8)
      .toPromise()
      .then((res) => {
        this.catalogueInteres = res;
      });
    // .catch((err) => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Error al generar el formulario por favor intente mas tarde',
    //     confirmButtonColor: '#2b317f',
    //   }).then((res) => {
    //     if (res.value) {
    //       this.regresar();
    //     }
    //   });
    // });
  }

  async getCatalogoExpectavias() {
    await this.catalogueChildService
      .getAllCatalogueChildByParent(9)
      .toPromise()
      .then((res) => {
        this.catalogueExpectavias = res;
      });
    // .catch((err) => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Error al generar el formulario por favor intente mas tarde',
    //     confirmButtonColor: '#2b317f',
    //   }).then((res) => {
    //     if (res.value) {
    //       this.regresar();
    //     }
    //   });
    // });
  }
}
