import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardModule,
  GridModule,
  NavModule,
  UtilitiesModule,
  TabsModule,
  TableModule,
  ButtonModule,
  FormModule,
  ModalModule,
  PlaceholderModule, AvatarModule
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, brandSet,cilUserPlus } from '@coreui/icons';
import { ColorsComponent, ThemeColorComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    TableModule,
    ButtonModule,
    FormModule,
    ModalModule,
    PlaceholderModule,
    ReactiveFormsModule,
    AvatarModule
  ],
  declarations: [
    ColorsComponent,
    ThemeColorComponent,
    TypographyComponent,
  ]
})
export class ThemeModule {
}
