import { CriterionDto } from './../../../models/CriterionDto';
import { CriterionEvalution } from './../../../models/CriterioEvaluation';
import Swal from 'sweetalert2';
import { CRITERIOSSERVICESService } from 'src/app/services/criteriosservices.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditCriterionComponent } from '../edit-criterion/edit-criterion.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-criterion',
  templateUrl: './create-criterion.component.html',
  styleUrls: ['./create-criterion.component.scss'],
})
export class CreateCriterionComponent implements OnInit {
  formCrearCriterio!: FormGroup;
  constructor(
    private criterion: CRITERIOSSERVICESService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<CreateCriterionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
  }

  ngOnInit() { }

  private buildForm() {
    this.formCrearCriterio = this.formBuilder.group({
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

  cancelar() {
    this.dialogRef.close(false);
  }

  guardar() {
    if (!this.formCrearCriterio.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario No valido',
        text: 'Por favor complete el formulario de manera correcta para continuar',
      });
      return;
    }

    const criterionInfo = this.formCrearCriterio.value;
    //crate criterion evaluation
    const criterion: CriterionDto = {
      nombreCriterio: criterionInfo.nombre,
      ponderacion: criterionInfo.ponderacion,
      usuarioAgrega: localStorage.getItem('user') || '',
    };

    this.criterion
      .addCriterio(criterion)
      .toPromise()
      .then((res) => {
        Swal.fire({
          title: 'Criterio Creado',
          icon: 'success',
          text: 'El criterio se ha creado correctamente',
          confirmButtonColor: '#2b317f'
        }).then(() => {
          this.dialogRef.close(true);
        });


      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Ha ocurrido un error al crear el criterio',
          confirmButtonColor: '#2b317f'
        });
      });

    console.log(criterion);
  }
}
