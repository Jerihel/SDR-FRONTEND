import { AdminCriterionComponent } from './../components/admin-criterion/admin-criterion.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "../components/landing-page/landing-page.component";
import { LoginComponent } from "../components/login/login.component";
import { RequestsComponent } from "../components/manager/requests/requests.component";
import { UsersComponent } from "../components/manager/users/users.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { LoginGuard } from "../guards/login/login.guard";
import { NoLoginGuard } from "../guards/no-login/no-login.guard";
import { NotFoundPageComponent } from '../components/not-found-page/not-found-page.component';
import { RequestEntrepreneurshipComponent } from '../components/request-entrepreneurship/request-entrepreneurship.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: LandingPageComponent },
  { path: "admin-criterion", component: AdminCriterionComponent },
  { path: "login", component: LoginComponent },
  { path: "login", component: LoginComponent, canActivate: [NoLoginGuard] },
  { path: "admin/users", component: UsersComponent, canActivate: [] },
  { path: "admin/requests", component: RequestsComponent, canActivate: [] },
  { path: "profile", component: ProfileComponent, canActivate: [LoginGuard] },
  { path: "request-entrepreneurship", component: RequestEntrepreneurshipComponent},
  { path: "**", component: NotFoundPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
