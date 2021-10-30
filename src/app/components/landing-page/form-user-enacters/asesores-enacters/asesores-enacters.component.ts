import { Router } from '@angular/router';
import { RequestEnacterDto } from './../../../../models/RequestEnacterDto';
import { GeneralService } from './../../../../services/general.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestDto } from 'src/app/models/RequestDto';
import { UserRequestDto } from 'src/app/models/UserRequestDto';
import { CatalogueChildService } from 'src/app/services/catalogue-child.service';
import Swal from 'sweetalert2';
import { UserRequestService } from 'src/app/services/user-request.service';
import { CatalogueChild } from 'src/app/models/CatalogueChild';
@Component({
  selector: 'app-asesores-enacters',
  templateUrl: './asesores-enacters.component.html',
  styleUrls: ['./asesores-enacters.component.scss'],
})
export class AsesoresEnactersComponent implements OnInit {
  catalogueChild: any[] = [
    {
      idCatalogueChild: 1,
      name: 'Universidad de los Andes',
    },
    {
      idCatalogueChild: 2,
      name: 'Universidad de las flores',
    },
  ];
  catalogoAsesoramiento: CatalogueChild[] = [];
  catalogoTipoAsesoramiento: CatalogueChild[] = [];
  formAsesor!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private catalogueChildService: CatalogueChildService,
    private spinner: NgxSpinnerService,
    private userRequestService: UserRequestService,
    private router: Router
  ) {
    this.buildForm();
  }

  async ngOnInit() {
    this.spinner.show();
    try {
      await this.getCatalogoAsesoramiento();
      await this.getCatalogoTipoAsesoramiento();
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error al Crear el formulario ',
        text: error?.error?.message ?? 'Error, por favor intente mas tarde',
        confirmButtonColor:'#2b317f'
      });
    }
    this.spinner.hide();


  }
  private buildForm() {
    this.formAsesor = this.formBuilder.group({
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
      profesion: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
        ],
      ],
      ocupacion: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(10),
        ],
      ],
      experiencia: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(10),
        ],
      ],
      areaAsesorar: ['', [Validators.required]],
      medioAsesoria: ['', [Validators.required]],
    });
  }

  regresar() {
    this.router.navigate(['/home']);
  }

  generarSolicitud() {
    if (this.formAsesor.invalid) {
      Swal.fire({
        title: 'Formulario invalido',
        icon: 'error',
        text: 'por favor revise el formulario para poder continuar',
      });
      return;
    }

    const formulario = this.formAsesor.value;

    const request1: RequestDto = {
      name: formulario.nombre,

      telephone: formulario.telefono,
      email: formulario.correo,
      requestType: 2,
      state: 1,
      lastName: null,
      idReviwer: null,
      appointmentLocation: null,
      appointment: null,
      requestComment: null,
    };
    const formulario2: UserRequestDto = {
      campus: null,
      facultad: null,
      career: null,
      enacterDegree: null,
      interest: null,
      lookUp: null,
      financialSupport: null,
      amount: null,
      supportDetail: null,
      adviserDegree: formulario.profesion,
      currenctActivity: formulario.ocupacion,
      hasExperience: formulario.experiencia,
      experienceDetail: null,
      adviseOn: formulario.areaAsesorar,
      adviseWay: formulario.medioAsesoria,
    };
    console.log(request1);

    const requestUser: RequestEnacterDto = {
      request: request1,
      userRequest: formulario2,
    };

    console.log(requestUser);
    this.userRequestService
      .createUserRequest(requestUser)
      .toPromise()
      .then((res) => {
        Swal.fire({
          title: 'Solicitud enviada',
          icon: 'success',
          text: 'Pronto nos comunicaremos con usted',
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

  async getCatalogoAsesoramiento() {
    try {
      console.log('obteniendo catalogos hijos');
      //se obtiene los catalogos con el id 4 que perteneces al catalogo de estados de criterios de evaluacion.
      this.catalogoAsesoramiento = await this.catalogueChildService
        .getAllCatalogueChildByParent(10)
        .toPromise();
    } catch (error: any) {
      console.log('entrando en el error');
      Swal.fire({
        icon: 'error',
        title: 'No existen Catalagos',
        text:
          error?.error?.message ??
          'Error al generar el formulario por favor intente mas tarde',
          confirmButtonColor:'#2b317f'
      });
    }
  }

  async getCatalogoTipoAsesoramiento() {
    try {
      console.log('obteniendo catalogos hijos');
      //se obtiene los catalogos con el id 4 que perteneces al catalogo de estados de criterios de evaluacion.
      this.catalogoTipoAsesoramiento = await this.catalogueChildService
        .getAllCatalogueChildByParent(11)
        .toPromise();
    } catch (error: any) {
      console.log('entrando en el error');
      Swal.fire({
        icon: 'error',
        title: 'No existen Catalagos',
        text:
          error?.error?.message ??
          'Error al generar el formulario por favor intente mas tarde',
          confirmButtonColor:'#2b317f'
      });
    }
  }
}
