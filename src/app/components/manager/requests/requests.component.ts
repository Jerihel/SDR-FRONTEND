import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { RequestResponse } from 'src/app/models/Request';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  selection = new SelectionModel<RequestResponse>(true, []);
  dataSource = new MatTableDataSource<RequestResponse>();
  displayColumnns: string[] = [
    "select",
    "#",
    "name",
    "reviewer",
    "state",
  ];

  constructor(
    private generalService: GeneralService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.generalService.getData<RequestResponse[]>(`${environment.api}/internal/get/requestReasignables`).toPromise().then(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.spinner.hide();
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveSelected() {
    this.spinner.show();
    if (this.selection.selected.length > 0) {
      const requests = this.selection.selected.map(item => item.noSolicitud);
      this.generalService.postData(`${environment.api}/internal/post/requestReasignable`, { requests }).toPromise().then(_ => {
        Swal.fire({
          title: '!Correcto!',
          text: "Solicitudes reasignadas exitosamente.",
          icon: 'success',
          confirmButtonColor: '#2b317f'
        });
      }).catch(_ => {
        Swal.fire({
          title: '!Error!',
          text: "No fue posible reasignar las solicitudes.",
          icon: 'error',
          confirmButtonColor: '#2b317f'
        });
      }).finally(() => this.spinner.hide());
    } else {
      Swal.fire({
        title: '!Error!',
        text: 'No se ha seleccionado ninguna solicitud.',
        icon: 'error',
        confirmButtonColor: '#2b317f'
      });
    }
  }
}
