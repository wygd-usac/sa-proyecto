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

  registrar(
    _name: any,
    _last_name: any,
    _password: any,
    _password2: any,
    _email: any,
    _phone: any,
    _photo: any,
    _gender: any,
    _birth_date: any,
    _address: any
  ) {
    try {
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
        2
        ).subscribe((res: any) => {
          console.log(res);
          if (res.msj !== undefined && (_password == _password2)) {
            this.mensaje = res.msj;
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
