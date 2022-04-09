import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsBrandComponent } from "./widgets-brand/widgets-brand.component";
import { ChartSample, WidgetsDropdownComponent } from './widgets-dropdown/widgets-dropdown.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuario'
    },
    children: [
      {
        path: '',
        redirectTo: 'crear',
      },
      {
        path: 'ver',
        component: WidgetsBrandComponent,
        data: {
          title: 'Crear Usuario',
        },
      },
      {
        path: 'crear',
        component: WidgetsComponent,
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
