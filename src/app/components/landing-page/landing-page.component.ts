import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  sticky = true;
  currentOption = 1;
  items: Item[];

  constructor() {
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

  ngOnInit() {
    document.body.addEventListener("scroll", event => this.onScroll(event))
  }

  onScroll(event) {
    this.sticky = event.target.scrollTop == 0;
  }

  changeOption(opt) {
    this.currentOption = opt;
    switch (opt) {
      case 1:
        document.getElementById("home").scrollIntoView({ behavior: "smooth" })
        break;
      case 2:
        document.getElementById("about").scrollIntoView({ behavior: "smooth" })
        break
      default:
        break;
    }
  }
}
