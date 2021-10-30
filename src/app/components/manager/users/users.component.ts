import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDetail, UserProfile } from 'src/app/models/UserDto';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  created = false;
  user?: UserProfile;
  editFormGroup: FormGroup;
  createFormGroup: FormGroup;
  states: any;
  roles: any;
  dataSource = new MatTableDataSource<UserDetail>();
  displayColumnns: string[] = [
    "#",
    "username",
    "name",
    "email",
    "state",
    "action",
  ];

  constructor(
    private authService: AuthService,
    private generalService: GeneralService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {

    config.backdrop = 'static';
    config.keyboard = false;
    this.createFormGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      roles: new FormControl(null, Validators.required),
      username: new FormControl(null),
      pass: new FormControl(null),
      email: new FormControl(null)
    });

    this.editFormGroup = new FormGroup({
      name: new FormControl({ value: null, disabled: true }, Validators.required),
      lastname: new FormControl({ value: null, disabled: true }, Validators.required),
      state: new FormControl(null, Validators.required),
      roles: new FormControl(null, Validators.required)
    });
  }

  async ngOnInit() {
    this.spinner.show();
    try {
      this.getAllUsers();
      this.states = await this.generalService.getData(`${environment.api}/external/catalogue/getBy/3`).toPromise();
      this.roles = await this.generalService.getData(`${environment.api}/external/catalogue/getBy/2`).toPromise();
    } catch (error) {
      console.log(error);
    }
    this.spinner.hide();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  async getAllUsers() {
    const users = await this.authService.getUsers().toPromise();
    this.dataSource.data = users;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCreateModal(content: any) {
    console.log(content);

    this.modalService.open(content, { centered: true });
  }

  async openEditModal(content: any, item: UserDetail) {
    this.spinner.show();
    try {
      this.user = await this.authService.getUserProfile(item.username).toPromise();
      const controls = this.editFormGroup.controls;
      controls.name.setValue(this.user?.name);
      controls.lastname.setValue(this.user?.lastName);
      controls.state.setValue(this.user?.state);
      controls.roles.setValue(this.roles.filter((role: any) => this.user?.roles.map(item => item.idRole).includes(role.idCatalogueChild)));
    } catch (error) {
      Swal.fire({
        title: "¡Error!",
        text: "Lo sentimos, ocurrio un error al intentar cambiar la contraseña. Por favor, intenta de nuevo más tarde.",
        icon: 'error',
        confirmButtonColor: '#2b317f'
      });
    }
    this.spinner.hide();
    this.modalService.open(content, { centered: true });
  }

  saveUser(type: number) {
    this.spinner.show();
    if (type == 1) {
      this.authService.updateUser({
        state: this.editFormGroup.value.state,
        roles: this.editFormGroup.value.roles.map((item: any) => item.idCatalogueChild)
      }, this.user?.username ?? '').toPromise().then(_ => {
        Swal.fire({
          title: "Usuario actualizado con éxito",
          icon: 'success',
          confirmButtonColor: '#2b317f'
        });
        this.modalService.dismissAll();
        this.editFormGroup.reset();
        this.user = undefined;
        this.getAllUsers();

      }).catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Usuario actualizado con éxito",
          icon: 'success',
          confirmButtonColor: '#2b317f'
        });
        this.modalService.dismissAll();
        this.editFormGroup.reset();
        this.user = undefined;
        this.getAllUsers();

        Swal.fire({
          title: "¡Error!",
          text: "Lo sentimos, ocurrio un error al intentar crear al usuario. Por favor, intenta de nuevo más tarde.",
          icon: 'error',
          confirmButtonColor: '#2b317f'
        });
      }).finally(() => this.spinner.hide());
    } else {
      this.authService.createUser({
        name: this.createFormGroup.value.name,
        lastName: this.createFormGroup.value.lastname,
        roles: this.createFormGroup.value.roles.map((item: any) => item.idCatalogueChild),
        state: this.createFormGroup.value.state
      }).toPromise().then(res => {
        Swal.fire({
          title: "Usuario creado con éxito",
          icon: 'success',
          confirmButtonColor: '#2b317f'
        });
        this.created = true;
        this.createFormGroup.controls.username.setValue(res.username);
        this.createFormGroup.controls.email.setValue(res.email);
        this.createFormGroup.controls.pass.setValue(res.password);

        this.getAllUsers();
      }).catch((error) => {
        console.log(error);

        Swal.fire({
          title: "¡Error!",
          text: "Lo sentimos, ocurrio un error al intentar guardar los cambios. Por favor, intenta de nuevo más tarde.",
          icon: 'error',
          confirmButtonColor: '#2b317f'
        });
      }).finally(() => this.spinner.hide());
    }
  }
}
