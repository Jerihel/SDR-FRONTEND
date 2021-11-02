import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  reviewRequests: ReviewRequests[] = [
    {
      noSolicitud: 1,
      nombreSolicitante: 'Prueba',
      tipoSolicitud: 'Prueba',
      estado: 'Activo'
    },
  ];

  dataSource = new MatTableDataSource<ReviewRequests>(
    this.reviewRequests
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
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
  }

  isLogged() {
    return true;
  }

  
}
