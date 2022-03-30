import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { AdminComponent } from './admin.component';
import {IconModule} from "@coreui/icons-angular";
import {ChartjsModule} from "@coreui/angular-chartjs";
import {WidgetsModule} from "../../widgets/widgets.module";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule
  ]
})
export class AdminModule { }
