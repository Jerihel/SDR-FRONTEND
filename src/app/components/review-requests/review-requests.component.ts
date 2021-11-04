import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { REQUESTSERVICE } from 'src/app/services/requestservice';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestDto } from 'src/app/models/RequestDto';
import { ReviewRequests } from 'src/app/models/ReviewRequests';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-requests',
  templateUrl: './review-requests.component.html',
  styleUrls: ['./review-requests.component.scss']
})
export class ReviewRequestsComponent implements OnInit {
  section = 'home';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  requests: RequestDto[] = [];



  dataSource = new MatTableDataSource<RequestDto>(
    this.requests
  );

  displayColumnns: string[] = [
    'noSolicitud',
    'nombreSolicitante',
    'tipoSolicitud',
    'estado',
    'acciones',
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog,
    private service: REQUESTSERVICE
  ) {}

  async ngOnInit() {
    console.log(this.requests);
    this.spinner.show();
    await this.getRequest();
    console.log(this.requests);
    this.spinner.hide();
  }

  isLogged() {
    return true;
  }

  // METODO PARA MOSTRAR LAS SOLICITUDES
  async getRequest() {
    try {
      console.log('OBTENIENDO SOLICITUDES');
      this.requests = await this.service
        .getAllRequest()
        .toPromise();
    } catch (error) {
      console.log('error', error);
    }

    this.dataSource.data = this.requests;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
}
