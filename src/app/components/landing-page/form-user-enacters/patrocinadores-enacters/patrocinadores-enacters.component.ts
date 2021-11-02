import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogueChildService } from 'src/app/services/catalogue-child.service';

@Component({
  selector: 'app-patrocinadores-enacters',
  templateUrl: './patrocinadores-enacters.component.html',
  styleUrls: ['./patrocinadores-enacters.component.scss']
})
export class PatrocinadoresEnactersComponent implements OnInit {catalogueChild: any[] = [];
  formEditarCriterio!: FormGroup;
  apoyoEconomico!: string;
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
      apoyo: [
        '',
        [
          Validators.required

        ],
      ],
      monto:[null],
      otro:[null],
      afterPatrocinio: ["",[Validators.required]]


    });
  }

  regresar() {}

  generarSolicitud() {}

}
