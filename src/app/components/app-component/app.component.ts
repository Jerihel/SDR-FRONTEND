import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {

  username: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    localStorage.setItem("section", "home");
  }

  ngOnInit() {
    document.body.addEventListener("scroll", event => this.onScroll(event));
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
    localStorage.setItem("section", opt)
    if (!this.navigateTo(`${opt}-anchor`)) {
      this.router.navigate(['home']);
    }
  }

  navigateTo(nodeName: string) {
    const node = document.getElementById(nodeName);

    if (!node) {
      return false;
    }
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  onSectionChange(section: string) {
    localStorage.setItem("section", section)
  }

  isLogged(): boolean {
    this.username = this.authService.getUserStored()?.username;
    return this.authService.isLoggedIn();
  }

  logout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  getSection() {
    return localStorage.getItem("section");
  }
}
