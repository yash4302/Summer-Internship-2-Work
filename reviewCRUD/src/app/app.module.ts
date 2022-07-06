import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsiCommonModule } from '@msi/cobalt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsModule } from './students/students.module';
import { LoginAuthService } from './_services/login-auth.service';
import { CRUDService } from './_services/crud.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsiCommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StudentsModule
  ],
  providers: [ LoginAuthService, CRUDService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
