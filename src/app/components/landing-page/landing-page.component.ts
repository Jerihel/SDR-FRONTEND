import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Item } from 'src/app/models/Item';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements AfterViewInit {
  items: Item[];
  supportForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private spinner: NgxSpinnerService
  ) {
    this.items = [
      {
        title: 'Equipo Enactus',
        content: 'Somos la fortaleza de tu emprendimiento.',
        image: 'assets/img/c1.jpg',
      },
      {
        title: 'Libertad Enactus',
        content: 'Se dueño de tu propia idea y libera tu sueños.',
        image: 'assets/img/c2.jpg',
      },
      {
        title: 'Profesionales Enactus',
        content: 'Lideres en emprendimiento y asesoria.',
        image: 'assets/img/c3.jpg',
      },
    ];

    this.supportForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, Validators.required)
    });
  }

  ngAfterViewInit() {
    document.body.addEventListener('scroll', (event) => this.onScroll(event));
    this.route.queryParamMap.subscribe((param) => {
      if (param.has('section')) {
        const section = param.get('section');
        setTimeout(() => {
          this.navigateTo(`${section}-anchor`);
        }, 10);
      }
    });
  }

  onScroll(event: any) {
    var navbar = document.querySelector('#nav-bar');
    if (event.target.scrollTop > 0) {
      navbar?.classList.add('stickyadd');
    } else {
      navbar?.classList.remove('stickyadd');
    }
  }

  changeOption(opt: string) {
    this.navigateTo(`${opt}-anchor`);
    localStorage.setItem('section', opt);
  }

  navigateTo(nodeName: string) {
    document
      .getElementById(nodeName)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onSectionChange(section: any) {
    localStorage.setItem('section', section);
  }

  isLogged() {
    return false;
  }

  sendEmail() {
    const value = this.supportForm.value;
    if (this.supportForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2b317f',
        heightAuto: false
      });
      return;
    }

    this.spinner.show();
    this.generalService.postData(environment.api + '/external/users/support', value).subscribe(
      (res: any) => {
        Swal.fire({
          title: 'Enviado',
          text: 'Tu mensaje ha sido enviado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2b317f',
          heightAuto: false
        });
        this.supportForm.reset();
        this.spinner.hide();
      },
      (err) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar tu mensaje',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2b317f',
          heightAuto: false
        });
        this.spinner.hide();
      }
    );
  }
}
