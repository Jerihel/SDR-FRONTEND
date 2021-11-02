import { CatalogueChild } from 'src/app/models/CatalogueChild';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogueChildService } from 'src/app/services/catalogue-child.service';
import { ValidadorPersonalizado } from 'src/app/utils/ValidadorPersonalizado';
@Component({
  selector: 'app-form-enacter',
  templateUrl: './form-enacter.component.html',
  styleUrls: ['./form-enacter.component.scss'],
})
export class FormEnacterComponent implements OnInit {
  formEditarCriterio!: FormGroup;
  apoyoEconomico!: string;
  catalogueChild!: CatalogueChild[];
  constructor(
    private formBuilder: FormBuilder,
    private catalogueChildService: CatalogueChildService,
    private spinner: NgxSpinnerService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}
  private buildForm() {
    this.formEditarCriterio = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email,ValidadorPersonalizado.correoUmg]],
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
      buscas: ['', Validators.required],
      formarParte:["",Validators.required]
    });
  }

  regresar() {}

  generarSolicitud() {}
}
