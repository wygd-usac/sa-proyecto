import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "../../../../services/request.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private router: Router, private servicio: RequestService, private storage: AngularFireStorage) { }

  // @ts-ignore
  uploadPercent: Observable<number>;
  // @ts-ignore
  urlImage: Observable<string>;

  public mensaje = '';

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // @ts-ignore
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

  }

  user : any;
  public visible = false;
  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  ValidateEmail(mail)
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return true;
    }
    alert("You have entered an invalid email address!")
    return false;
  }

  registrar(
    _name: string,
    _last_name: string,
    _password: string,
    _password2: string,
    _email: string,
    _phone: string,
    _photo: string,
    _gender: string,
    _birth_date: string,
    _address: string
  ) {
    try {
      if(_password !== _password2){
        this.mensaje = 'contraseñas no conciden';
        this.toggleLiveDemo()
        return;
      }
      if(!this.ValidateEmail(_email)){
        this.mensaje = 'correo invalido';
        this.toggleLiveDemo()
        return;
      }
      this.servicio.registrerUser(
        _name,
        _last_name,
        _password,
        _email,
        _phone,
        _photo,
        _gender,
        _birth_date,
        _address,
        2,
        3
        ).subscribe((res: any) => {
          if (res.msg != undefined) {
            this.mensaje = res.msg;
            this.toggleLiveDemo();
          } else {
            this.mensaje = 'Ocurrio un error';
            this.toggleLiveDemo();
          }
        }
        ,
        err => {
          this.mensaje = 'ocurrio un error, prueba con otro correo o contraseña';
          this.toggleLiveDemo()
        }
      );
    } catch (e) {
      this.mensaje = 'ocurrio un error, prueba con otro correo o contraseña';
      this.toggleLiveDemo()
    }
  }

}
