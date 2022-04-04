import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "../../../../services/request.service";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { Observable } from 'rxjs/internal/Observable';
import Swal from "sweetalert2";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  user : any = {id_user: '', name: '', last_name: '', password: '',
    phone: '', gender: '', birth_date: '', photo : '' };

  constructor(private router: Router, private servicio: RequestService, private storage: AngularFireStorage) {

  }

  public visible = false;
  public visible2 = false;
  public mensaje = '';

  toggleLiveDemo() {
    this.visible = !this.visible;
    this.router.navigate(['/forms/editprofile']);
    this.ngOnInit();
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  toggleLiveDemoBorrar() {
    try {
      // @ts-ignore
      // @ts-ignore
      this.servicio.deleteUser().subscribe((res: any) => {
          if (res.msg ) {
            this.mensaje = res.msg;
            localStorage.clear();
            this.router.navigate(['/login']);
            //this.urlImage = res[0].photo;
          } else {
            this.mensaje = 'Ocurrio un error';
            this.toggleLiveDemo();
          }
        }
        ,
        err => {
          this.mensaje = 'ocurrio un error, asegurese estar loageado';
          this.toggleLiveDemo()
        }
      );
    } catch (e) {
      this.mensaje = 'ocurrio un error';
      this.toggleLiveDemo()
    }
  }

  toggleLiveDemoNoBorar() {
    this.visible2 = !this.visible2;
  }

  handleLiveDemoChange2(event: any) {
    this.visible2 = event;
  }

  // @ts-ignore
  uploadPercent: Observable<number>;
  // @ts-ignore
  urlImage: Observable<string>;

  ngOnInit(): void {
    try {
      // @ts-ignore
      // @ts-ignore
      this.servicio.getUser().subscribe((res: any) => {
          if (res instanceof Array) {
            this.user = res[0];
            //this.urlImage = res[0].photo;
          } else {
            this.mensaje = 'Ocurrio un error';
            this.toggleLiveDemo();
          }
        }
        ,
        err => {
          this.mensaje = 'ocurrio un error, asegurese estar loageado';
          this.toggleLiveDemo()
        }
      );
    } catch (e) {
      this.mensaje = 'ocurrio un error';
      this.toggleLiveDemo()
    }
  }

  editUsuer( name, last_name, password, repeat_pass, phone, gender, birth_date, photo ){
    if( password !== repeat_pass ){
      this.mensaje = 'contraseñas no coinciden';
      this.toggleLiveDemo();
      return;
    }
    if( photo === '' ){
      photo = localStorage.getItem("photo")
    }
    this.servicio.editUser( {
      // @ts-ignore
      id_user: parseInt(localStorage.getItem('idu')),
      name: name,
      last_name: last_name,
      password: password,
      phone: phone,
      gender: gender,
      birth_date: birth_date,
      photo : photo } ).subscribe(
      (res: any) => {
        this.mensaje = res.msg;
        this.toggleLiveDemo();
      }
      ,
      err => {
        this.mensaje = 'ocurrio un error, asegurese estar loageado';
        this.toggleLiveDemo()
      }
    );
  }

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

  formatDate(date) {
    date = date.replace('T00:00:00.000Z','');
    return date;
  }

}
