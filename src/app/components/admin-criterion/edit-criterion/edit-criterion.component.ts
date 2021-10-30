import { CatalogueChildService } from './../../../services/catalogue-child.service';
import { CriterionEvalutionProjection } from './../../../models/CriterionEvalutionProjection';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogueChild } from 'src/app/models/CatalogueChild';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CriterionEvalution } from 'src/app/models/CriterioEvaluation';
import { CRITERIOSSERVICESService } from 'src/app/services/criteriosservices.service';

@Component({
  selector: 'app-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss'],
})
export class EditCriterionComponent implements OnInit {
  formEditarCriterio!: FormGroup;
  criterioUpdate!: CriterionEvalutionProjection;
  catalogueChild!: CatalogueChild[];

  constructor(
    public dialogRef: MatDialogRef<EditCriterionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private catalogueChildService: CatalogueChildService,
    private spinner: NgxSpinnerService,
    private criterio: CRITERIOSSERVICESService
  ) {
    this.buildForm();
  }

  async ngOnInit() {
    this.spinner.show();
    try {
      console.log(this.dialogRef.componentInstance.data.criterio);
      this.criterioUpdate = this.dialogRef.componentInstance.data.criterio;
      await this.getCatalogoHijo();
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error al Crear el formulario ',
        text: error?.error?.message ?? 'Error, por favor intente mas tarde',
      });
    }
    this.spinner.hide();
  }

  private buildForm() {
    this.formEditarCriterio = this.formBuilder.group({
      estado: ['', [Validators.required]],
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(5),
        ],
      ],
      ponderacion: [
        '',
        [
          Validators.required,
          Validators.max(10),
          Validators.min(1),
          Validators.pattern(/^(0|\-?[1-9][0-9]*)$/),
        ],
      ],
    });
  }

  actualizarCriterio() {
    let valorFormulario = this.formEditarCriterio.value;
    let noCriterio = this.criterioUpdate.noCriterio;

    //armamos la informacion para enviar al servicio

    console.log(valorFormulario);
    console.log(noCriterio);

    const criterionEvaluation: CriterionEvalution = {
      noCriterio: noCriterio,
      nombreCriterio: valorFormulario.nombre,
      ponderacion: valorFormulario.ponderacion,
      estado: valorFormulario.estado,
      usuarioAgrega: '',
      fechaAgrega: undefined,
      fechaModifica: new Date(),
      usuarioModifica: localStorage.getItem('username') || '',
    };

    this.criterio
      .updateCriterio(criterionEvaluation)
      .toPromise()
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Criterio Actualizado',
          text: `El criterio ${res.noCriterio} se actualizo correctamente`,
        }).then(() => {

         this.dialogRef.close();
        });

      })
      .catch((err) => {
        console.log('error al actualizar el criterio', err);

        Swal.fire({
          icon: 'error',
          title: 'Error al Actualizar el criterio',
          text: err?.error?.message ?? 'Error, por favor intente mas tarde',
        });
      });
  }

  regresar() {
    this.dialogRef.close();
  }

  editarCriterio() {}

  async getCatalogoHijo() {
    try {
      console.log('obteniendo catalogos hijos');
      //se obtiene los catalogos con el id 4 que perteneces al catalogo de estados de criterios de evaluacion.
      this.catalogueChild = await this.catalogueChildService
        .getAllCatalogueChildByParent(3)
        .toPromise();
    } catch (error: any) {
      console.log('entrando en el error');
      Swal.fire({
        icon: 'error',
        title: 'No existen Catalagos',
        text:
          error?.error?.message ??
          'No fue posible acceder a los catalogos. Por favor Intente mas tarde',
      });
    }
  }
}
