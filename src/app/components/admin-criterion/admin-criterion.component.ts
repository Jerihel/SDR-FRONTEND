import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CriterionEvalutionProjection } from 'src/app/models/CriterionEvalutionProjection';

import { CRITERIOSSERVICESService } from 'src/app/services/criteriosservices.service';
import Swal from 'sweetalert2';
import { CreateCriterionComponent } from './create-criterion/create-criterion.component';
import { EditCriterionComponent } from './edit-criterion/edit-criterion.component';
import { AlertUtils } from 'src/app/utils/alert-utils';
@Component({
  selector: 'app-admin-criterion',
  templateUrl: './admin-criterion.component.html',
  styleUrls: ['./admin-criterion.component.scss'],
})
export class AdminCriterionComponent implements OnInit {
  section = 'home';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  criteriosEvaluacion: CriterionEvalutionProjection[] = [];

  dataSource = new MatTableDataSource<CriterionEvalutionProjection>(
    this.criteriosEvaluacion
  );

  displayColumnns: string[] = [
    'noCriterio',
    'nombreCriterio',
    'ponderacion',
    'estado',
    'acciones',
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private service: CRITERIOSSERVICESService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    console.log(this.criteriosEvaluacion);
    this.spinner.show();
    await this.getCriterios();
    console.log(this.criteriosEvaluacion);
    this.spinner.hide();
  }

  isLogged() {
    return true;
  }

  async getCriterios() {
    try {
      console.log('OBTENIENDO COLABORADORES');
      this.criteriosEvaluacion = await this.service
        .getAllCriterio()
        .toPromise();
    } catch (error) {
      console.log('error', error);
      this.criteriosEvaluacion = [];
      AlertUtils.showToast('info', "Aún no existen criterios de evaluacion.")
    }

    this.dataSource.data = this.criteriosEvaluacion;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clearFilter() { }
  regresar() {
    this.router.navigate(['/home']);
  }

  async editarUsuario(criterio: CriterionEvalutionProjection) {
    console.log(`Criterios ${criterio}`);
    const dialogRef = this.dialog.open(EditCriterionComponent, {
      height: '420px',
      width: '600px',
      disableClose: true,
      data: { criterio },
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.getCriterios();
    });
  }

  async crearCriterio() {
    console.log('abriendo dialogo');
    const dialogRef = this.dialog.open(CreateCriterionComponent, {
      height: '340px',
      width: '600px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.getCriterios();
    });
  }
}
