import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit {

  items: Item[];

  constructor(
    private route: ActivatedRoute
  ) {
    this.items = [
      {
        title: "Equipo Enactus",
        content: "Somos la fortaleza de tu emprendimiento.",
        image: "assets/img/c1.jpg"
      },
      {
        title: "Libertad Enactus",
        content: "Se dueño de tu propia idea y libera tu sueños.",
        image: "assets/img/c2.jpg"
      },
      {
        title: "Profesionales Enactus",
        content: "Lideres en emprendimiento y asesoria.",
        image: "assets/img/c3.jpg"
      }
    ]
  }

  ngAfterViewInit() {
    document.body.addEventListener("scroll", event => this.onScroll(event));
    this.route.queryParamMap.subscribe(param => {
      if (param.has("section")) {
        const section = param.get('section');
        setTimeout(() => {
          this.navigateTo(`${section}-anchor`);
        }, 10);
      }
    })
  }

  onScroll(event: any) {
    var navbar = document.querySelector('#nav-bar')
    if (event.target.scrollTop > 0) {
      navbar?.classList.add('stickyadd')
    } else {
      navbar?.classList.remove('stickyadd')
    }
  }

  changeOption(opt: string) {
    this.navigateTo(`${opt}-anchor`);
    localStorage.setItem("section", opt);
  }

  navigateTo(nodeName: string) {
    document.getElementById(nodeName)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  onSectionChange(section: any) {
    localStorage.setItem("section", section);
  }

  isLogged() {
    return false;
  }
}
