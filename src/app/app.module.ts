import { AsesoresEnactersComponent } from './components/landing-page/form-user-enacters/asesores-enacters/asesores-enacters.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routers/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app-component/app.component';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ScrollSpyDirective } from './directives/scroll-spy/scroll-spy.directive';
import { AdminCriterionComponent } from './components/admin-criterion/admin-criterion.component';

import { RequestInterceptor } from "./interceptors/request.interceptor";
import { EditCriterionComponent } from './components/admin-criterion/edit-criterion/edit-criterion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/manager/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


import { ProfileComponent } from './components/profile/profile.component';
import { CreateCriterionComponent } from './components/admin-criterion/create-criterion/create-criterion.component';
import { RequestsComponent } from './components/manager/requests/requests.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatrocinadoresEnactersComponent } from './components/landing-page/form-user-enacters/patrocinadores-enacters/patrocinadores-enacters.component';
import { FormEnacterComponent } from './components/landing-page/form-user-enacters/form-enacter/form-enacter.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RequestEntrepreneurshipComponent } from './components/request-entrepreneurship/request-entrepreneurship.component';
import { ReviewRequestsComponent } from './components/review-requests/review-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    UsersComponent,
    ScrollSpyDirective,
    AdminCriterionComponent,
    LoginComponent,
    EditCriterionComponent,
    ProfileComponent,
    CreateCriterionComponent,
    ProfileComponent,
    RequestsComponent,
    NotFoundPageComponent,
    PatrocinadoresEnactersComponent,
    FormEnacterComponent,
    AsesoresEnactersComponent,
    RecoverPasswordComponent,
    RequestEntrepreneurshipComponent,
    ReviewRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('sw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
