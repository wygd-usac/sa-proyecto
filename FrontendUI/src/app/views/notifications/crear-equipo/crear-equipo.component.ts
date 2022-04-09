import {
  Component,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  VERSION,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './crear-equipo.component.html'
})
export class CrearEquipoComponent {

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private servicio: RequestService,
    private storage: AngularFireStorage,
    private fb: FormBuilder
  ) {}

  uploadPercent: Observable<number> | undefined;
  // @ts-ignore
  urlImage: Observable<string>;
  listCountrys: any;

  // @ts-ignore
  select: FormGroup;

  ngOnInit(): void {
    const rol = localStorage.getItem("rol");
    // @ts-ignore
    this.getSelects();
    this.select = this.fb.group({
      selectcountry: [null],
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

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // @ts-ignore
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }

  id_country = 0;

  getSelectedOptions() {
    //console.log(this.selectedstand.value.selectedstand);
    this.id_country = this.select.value.selectcountry;
    //console.log(this.id_country,this.id_stand,this.id_team);
  }

  registrar(
    _name: string,
    _fundation_date: string,
    _photo: string
  ) {
    this.getSelectedOptions();
    console.log(
      'country: ',
      this.id_country,
      _photo
    );

    if (
      this.id_country != null 
    ) {
      try {
        this.servicio
          .addTeam(
            _name,
            _fundation_date,
            this.id_country,
            _photo
          )
          .subscribe(
            (res: any) => {
              //console.log(res.status);
              if (res.status == 200) {
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
                this.servicio.insertLog('Create Team: '+ _name + ' ');
                Toast.fire({
                  icon: 'success',
                  title: 'Team created successfully ' + _name + ' ',
                });
                this.router.navigate(['/empleado/equipos']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Something went wrong ',
                  text: res.message,
                });
              }
            },
            (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Something went wrong ',
                text: err.message,
              });
            }
          );
      } catch (e) {}
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Data missing',
        text: 'Something went wrong!',
      });
    }
  }


}
