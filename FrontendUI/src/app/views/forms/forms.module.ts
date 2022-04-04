import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  TableModule,
  FormModule,
  ModalModule,
  GridModule,
  ListGroupModule,
  SharedModule,
  AvatarModule,
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import {
  cilListNumbered,
  cilPaperPlane,
  brandSet,
  cilUserPlus,
} from '@coreui/icons';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { FormsRoutingModule } from './forms-routing.module';
import { RangesComponent } from './ranges/ranges.component';
import { FloatingLabelsComponent } from './floating-labels/floating-labels.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { SelectComponent } from './select/select.component';
import { ChecksRadiosComponent } from './checks-radios/checks-radios.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { LayoutComponent } from './layout/layout.component';
import { ValidationComponent } from './validation/validation.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ReportesclienteComponent } from './reportescliente/reportescliente.component';
import { ClienteteamComponent } from './clienteteam/clienteteam.component';
import { PersonageComponent } from './personage/personage.component';
import { ModalsComponent } from '../notifications/modals/modals.component';

@NgModule({
  declarations: [
    RangesComponent,
    FloatingLabelsComponent,
    FormControlsComponent,
    SelectComponent,
    ChecksRadiosComponent,
    InputGroupsComponent,
    LayoutComponent,
    ValidationComponent,
    EditprofileComponent,
    ReportesclienteComponent,
    ClienteteamComponent,
    PersonageComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    DocsComponentsModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ModalModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    TableModule,
    AvatarModule
  ]
})
export class CoreUIFormsModule {
}
