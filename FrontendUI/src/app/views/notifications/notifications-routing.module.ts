import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BadgesComponent } from './badges/badges.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ModalsComponent } from './modals/modals.component';
import { ToastersComponent } from './toasters/toasters.component';
import {EquipoComponent} from './equipo/equipo.component';
import {CrearEquipoComponent} from './crear-equipo/crear-equipo.component';
import {CompetenciaComponent} from './competencia/competencia.component';
import {CrearCompetenciaComponent} from './crear-competencia/crear-competencia.component';
import { UsuarioPartidosComponent } from './usuario-partidos/usuario-partidos.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Empleado'
    },
    children: [
      {
        path: '',
        redirectTo: 'estadios'
      },
      {
        path: 'estadios',
        component: AlertsComponent,
        data: {
          title: 'Estadios'
        }
      },
      {
        path: 'crear-estadios',
        component: BadgesComponent,
        data: {
          title: 'Crear Estadios'
        }
      },
      {
        path: 'crear-partidos',
        component: ModalsComponent,
        data: {
          title: 'Crear partidos'
        }
      },
      {
        path: 'partidos',
        component: ToastersComponent,
        data: {
          title: 'Partidos'
        }
      },
      {
        path: 'crear-equipos',
        component: CrearEquipoComponent,
        data: {
          title: 'Crear equipos'
        }
      },
      {
        path: 'equipos',
        component: EquipoComponent,
        data: {
          title: 'Equipos'
        }
      },
      {
        path: 'crear-competencia',
        component: CrearCompetenciaComponent,
        data: {
          title: 'Crear competencia'
        }
      },
      {
        path: 'competencia',
        component: CompetenciaComponent,
        data: {
          title: 'Competencia'
        }
      },
        {
          path: 'user-partidos',
          component: UsuarioPartidosComponent,
          data: {
            title: 'User-partidos'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {
}
