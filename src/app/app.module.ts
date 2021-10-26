import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./routers/app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "./modules/material.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./components/app-component/app.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { ScrollSpyDirective } from './directives/scroll-spy/scroll-spy.directive';
import { AdminCriterionComponent } from './components/admin-criterion/admin-criterion.component';
import { LoginComponent } from "./components/login/login.component";
import { RequestInterceptor } from "./interceptors/request.interceptor";
import { EditCriterionComponent } from './components/admin-criterion/edit-criterion/edit-criterion.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ScrollSpyDirective,
    AdminCriterionComponent,
    LoginComponent,
    EditCriterionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
