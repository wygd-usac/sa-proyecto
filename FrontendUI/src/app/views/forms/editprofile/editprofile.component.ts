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

  user : any;

  constructor(private router: Router, private servicio: RequestService, private storage: AngularFireStorage) {

  }


  public visible = false;
  public mensaje = '';

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
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
            alert(this.user.name);
            //this.urlImage = res[0].photo;
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
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }


}
