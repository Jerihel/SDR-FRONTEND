import { AdminCriterionComponent } from './../components/admin-criterion/admin-criterion.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "../components/landing-page/landing-page.component";
import { LoginComponent } from "../components/login/login.component";
import { UsersComponent } from "../components/manager/users/users.component";
import { LoginGuard } from "../guards/login/login.guard";
import { NoLoginGuard } from "../guards/no-login/no-login.guard";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: LandingPageComponent },
  {path: "admin-criterion",component: AdminCriterionComponent},
  { path: "login", component: LoginComponent },
  { path: "login", component: LoginComponent, canActivate: [NoLoginGuard] },
  { path: "admin/users", component: UsersComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
