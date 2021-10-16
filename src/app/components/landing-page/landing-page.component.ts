import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  section = "home";
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
    document.body.addEventListener("scroll", event => this.onScroll(event));
  }

  onScroll(event) {
    var navbar = document.querySelector('#nav-bar')
    if (event.target.scrollTop > 80) {
      navbar.classList.add('stickyadd')
    } else {
      navbar.classList.remove('stickyadd')
    }
  }

  changeOption(opt) {
    this.section = opt;
    document.getElementById(`${opt}-anchor`).scrollIntoView({ behavior: "smooth", block: "start" })
  }

  onSectionChange(section){
    console.log(section);
    
    this.section = section;
  }
}
