import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Personas',
    },
    children: [
      {
        path: '',
        redirectTo: 'crear',
      },
      {
        path: 'crear',
        component: ColorsComponent,
        data: {
          title: 'Crear Persona',
        },
      },
      {
        path: 'ver',
        component: TypographyComponent,
        data: {
          title: 'Ver Personas',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
