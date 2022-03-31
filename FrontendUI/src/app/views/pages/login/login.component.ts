import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RequestService} from '../../../../services/request.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private servicio: RequestService) {

  }

  ngOnInit(): void {
  }

  public visible = false;
  public mensaje = '';

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  user : any;
  iniciar(email: string, password: string) {
    try {
      this.servicio.loginUser(email, password).subscribe((res: any) => {
          if (res instanceof Array) {
            this.mensaje = 'Bienvenido';
            this.user = res[0];
            localStorage.setItem("rol", (this.user.id_rol).toString());
            localStorage.setItem("email", this.user.email);
            localStorage.setItem("token", this.user.token);
            this.router.navigate(['/administracion']);
            this.toggleLiveDemo();
          } else {
            this.mensaje = 'Ocurrio un error';
            this.toggleLiveDemo();
          }
        }
        ,
        err => {
          this.mensaje = 'credenciales invalidas';
          this.toggleLiveDemo()
        }
      );
    } catch (e) {
      this.mensaje = 'ocurrio un error';
      this.toggleLiveDemo()
    }
  }

}
