import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsBrandComponent } from "./widgets-brand/widgets-brand.component";
import { ChartSample, WidgetsDropdownComponent } from './widgets-dropdown/widgets-dropdown.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetsComponent,
    data: {
      title: 'Usuario'
    },
    children: [
      {
        path: '',
        redirectTo: 'crear',
      },
      {
        path: 'creara',
        component: WidgetsComponent,
        data: {
          title: 'Crear Usuario',
        },
      },
      {
        path: 'v',
        component: WidgetsBrandComponent,
        data: {
          title: 'Ver Usuario',
        },
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule {
}
