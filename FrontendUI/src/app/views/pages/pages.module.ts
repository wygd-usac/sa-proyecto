import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component'
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import {ButtonModule, CardModule, FormModule, GridModule, ModalModule} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import {Router} from "@angular/router";
import {RequestService} from "../../../services/request.service";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ModalModule
  ]
})
export class PagesModule {

  constructor() {

  }




}
