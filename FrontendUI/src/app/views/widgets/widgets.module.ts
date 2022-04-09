import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AvatarModule,
  ButtonModule,
  CardModule,
  DropdownModule, FormModule,
  GridModule,
  ProgressModule,
  SharedModule, TableModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsBrandComponent } from './widgets-brand/widgets-brand.component';
import { ChartSample, WidgetsDropdownComponent } from './widgets-dropdown/widgets-dropdown.component';
import { WidgetsEComponent } from './widgets-e/widgets-e.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    ChartSample,
    WidgetsEComponent
  ],
    imports: [
        CommonModule,
        WidgetsRoutingModule,
        GridModule,
        WidgetModule,
        IconModule,
        DropdownModule,
        SharedModule,
        ButtonModule,
        CardModule,
        DocsComponentsModule,
        ProgressModule,
        ChartjsModule,
        FormModule,
        AvatarModule,
        TableModule,
        ReactiveFormsModule
    ],
  exports: [
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    WidgetsComponent,
  ]
})
export class WidgetsModule {
}
