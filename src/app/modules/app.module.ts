import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../router/app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxQRCodeModule } from "@techiediaries/ngx-qrcode";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "../components/app-component/app.component";

@NgModule({
  declarations: [
    AppComponent
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
    NgxQRCodeModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
