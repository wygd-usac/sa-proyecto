import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RequestService} from '../../../../services/request.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private servicio: RequestService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("rol") !== null) {
      this.router.navigate(['/forms/editprofile'])
    }
  }

  public visible = false;

  public mensaje = '';

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  user: any;

  AESB(ip: string){
    localStorage.setItem("ip", ip);
    localStorage.setItem("esb", "true")
  }

  DESB(){
    localStorage.setItem("esb", "true")
  }

  restore(email: string) {
    try {
      this.servicio.restablecer(email).subscribe((res: any) => {
          if (res.msg !== null && res.msg !== undefined ) {
            this.mensaje = res.msg
            this.toggleLiveDemo();
          } else {
            this.mensaje = 'Ocurrio un error';
            this.toggleLiveDemo();
          }
        }
        ,
        err => {
          this.mensaje = 'error restableciendo';
          this.toggleLiveDemo()
        }
      );
    } catch (e) {
      this.mensaje = 'ocurrio un error';
      this.toggleLiveDemo()
    }
  }


  iniciar(email: string, password: string) {
    this.servicio.loginUser(email, password).subscribe((res: any) => {
      alert(res);
      console.log(res);
    })

    try {
      this.servicio.loginUser(email, password).subscribe((res: any) => {
          if (res instanceof Array) {
            this.mensaje = 'Bienvenido';
            this.user = res[0];
          }else{
            this.user = res.data;
          }

            localStorage.setItem("email", this.user.email);
            localStorage.setItem("token", this.user.token);
            localStorage.setItem("idu", this.user.id_user);
            localStorage.setItem("id_user", this.user.id_user);
            this.servicio.insertLog('Login');
            if (this.user.id_rol==1){
              this.router.navigate(['administracion']);
            }
            this.router.navigate(['forms/editprofile']);
            localStorage.setItem("photo", this.user.photo);
            localStorage.setItem("full_name", this.user.name+' '+this.user.lastname);
            localStorage.setItem("rol", (this.user.id_rol).toString());
            localStorage.setItem("id_rol", (this.user.id_rol).toString());
            //this.toggleLiveDemo();
            const Toast = Swal.mixin({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully',
              text: 'Bienvenido '
            })

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
