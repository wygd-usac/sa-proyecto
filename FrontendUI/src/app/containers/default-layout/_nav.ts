import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
export function nivel(){

  const x = localStorage.getItem("rol");
  //console.log(x);
  //console.log(x == "1");
  let sesion : INavData[] = [];
  // Usuario Administrador
  if( x == "1"){
    sesion = [
      {
        name: 'Adiministaracion',
        url: '/administracion',
        iconComponent: { name: 'cil-puzzle' }
      },
      {
        title: true,
        name: 'Personas'
      },
      {
        name: 'Crear',
        url: '/administracion/persona/crear',
        iconComponent: { name: 'cil-pencil' }
      },
      {
        name: 'Ver',
        url: '/administracion/persona/ver',
        iconComponent: { name: 'cil-list' }
      },
      {
        name: 'Reportes',
        title: true
      },
      {
        name: 'Usuarios',
        url: '/reportes/usuario',
        iconComponent: {name: 'cil-cursor'}
      },
          {
            name: 'Empleado',
            url: '/reportes/empleado'
          },
          {
            name: 'Dropdowns',
            url: '/buttons/dropdowns'
          },


    ];
  }
  // usuario cliente
  else if( x== "2"){
    sesion = [
      {
        name: 'Empleado',
        url: '/dashboard',
        iconComponent: { name: 'cil-user' },
        badge: {
          color: 'info',
          text: 'Bienvenido'
        }
      },
      {
        title: true,
        name: 'Estadio'
      },
          {
            name: 'Crear',
            url: '/buttons/buttons',
            iconComponent: { name: 'cil-pencil' }
          },
          {
            name: 'Ver',
            url: '/buttons/button-groups',
            iconComponent: { name: 'cil-list' }
          },
      {
        title: true,
        name: 'Partidos'
      },
      {
        name: 'Ver',
        url: '/buttons/dropdowns',
        iconComponent: { name: 'cil-pencil' }
      },
    ];
  }
  // Usuario normal
  else if ( x== "3"){
    sesion = [
      {
        name: 'Profile',
        iconComponent: { name: 'cil-user' },
        children: [
          {
            name: 'Setting',
            url: '/forms/editprofile',
            iconComponent: { name: 'cil-settings'}
          },
        ]
      },
    ];
  }
  else {
    sesion = [
      {
        name: 'Access',
        url: '/login',
        iconComponent: { name: 'cil-star' },
        children: [
          {
            name: 'Login',
            url: '/login',
            iconComponent: { name: 'cil-lock-locked'}
          },
          {
            name: 'Register',
            url: '/register',
            iconComponent: { name: 'cil-task' }
          },
          {
            name: 'Home',
            url: '/',
            iconComponent: { name: 'cil-home' }
          }
        ]
      },
    ];
  }
  return sesion;
}

