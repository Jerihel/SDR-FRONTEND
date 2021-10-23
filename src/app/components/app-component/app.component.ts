import { Component, OnInit } from "@angular/core";
import { User } from "src/app/modules/UserDto";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {

  constructor() {
    localStorage.setItem("section", "home");
  }

  ngOnInit() {
    document.body.addEventListener("scroll", event => this.onScroll(event));
  }

  onScroll(event) {
    var navbar = document.querySelector('#nav-bar')
    if (event.target.scrollTop > 0) {
      navbar.classList.add('stickyadd')
    } else {
      navbar.classList.remove('stickyadd')
    }
  }

  changeOption(opt) {
    if (this.navigateTo(`${opt}-anchor`)) {
      localStorage.setItem("section", opt)
    }
  }

  navigateTo(nodeName) {
    const node = document.getElementById(nodeName);

    if (!node) {
      return false;
    }
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  onSectionChange(section) {
    localStorage.setItem("section", section)
  }

  getUserStored(): User {
    return JSON.parse(localStorage.getItem("user_info"));
  }

  isLogged(): boolean {
    return !!this.getUserStored() ?? false;
  }

  getSection() {
    return localStorage.getItem("section");
  }
}
