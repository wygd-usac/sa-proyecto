import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {RequestService} from "../../../../services/request.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsComponent {
  constructor(
    private servicio: RequestService, private storage: AngularFireStorage,private router: Router,
    private fb: FormBuilder
  ) {}

  // @ts-ignore
  select: FormGroup;

  listCountrys: any;
  id_country:number=0;
  rol=0;
  gender='';
  ngOnInit(): void {
    const rol = localStorage.getItem("rol");
    // @ts-ignore
    if (rol != 1) {
      this.router.navigate(['/404']);
    }
    this.getSelects();
    this.select = this.fb.group({
      selecttype: [null],
      selectgender: [null],
      selectcountry: [null],
      selectstatus: [null],
    });
  }

  getSelects() {
    try {
    this.servicio.getCountrys().subscribe(
        (res: any) => {
          this.listCountrys = res.data;
          if (this.listCountrys.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );

    } catch (e) {}
  }

  getSelectedOptions() {
    this.gender = this.select.value.selectgender;
    this.rol = this.select.value.selecttype;
    this.id_country = this.select.value.selectcountry;
  }

  // @ts-ignore
  uploadPercent: Observable<number>;
  // @ts-ignore
  urlImage: Observable<string>;

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
    _address: string,
    type:string
  ) {
    this.getSelectedOptions();
    try {
      if(_password !== _password2){
        return;
      }
      if(!this.ValidateEmail(_email)){
        return;
      }
      this.servicio.registrerUser(
        _name,
        _last_name,
        _password,
        _email,
        _phone,
        _photo,
        this.gender,
        _birth_date,
        _address,
        this.id_country,
        this.rol
      ).subscribe((res: any) => {
          //console.log(res)
          if (res.msg != '') {
            const Toast = Swal.mixin({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });
            this.servicio.insertLog('Created User: '+ _name + ' ' + _last_name);
            Toast.fire({
              icon: 'success',
              title: 'Person created successfully ' + _name + ' ' + _last_name,
            });
            this.router.navigate(['/administracion/persona/ver']);
          } else {
            console.log(res)
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong ',
              text: res.message,
            });
          }
        }
        ,
        err => {

        }
      );
    } catch (e) {

    }
  }

}
