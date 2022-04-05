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
  templateUrl: './crear-competencia.component.html'
})

export class CrearCompetenciaComponent {
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

  listTeams: any;
  listCountrys: any;

  // @ts-ignore
  select: FormGroup;

  ngOnInit(): void {
    const rol = localStorage.getItem("rol");
    // @ts-ignore
    this.getSelects();
    this.select = this.fb.group({
      selectteam: [null],
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

      this.servicio.getTeams().subscribe(
        (res: any) => {
          this.listTeams = res.data;
          if (this.listTeams.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {}
  }

  id_country = 0;
  id_team = 0;

  getSelectedOptions() {
    //console.log(this.selectedstand.value.selectedstand);
    this.id_team = this.select.value.selectteam;
    this.id_country = this.select.value.selectcountry;
    //console.log(this.id_country,this.id_stand,this.id_team);
  }

  registrar(
    _name: string,
    _type: string,
    _year: string
  ) {
    this.getSelectedOptions();
    console.log(
      'country: ',
      this.id_country,
      ' team: ',
      this.id_team
    );

    if (
      this.id_country != null &&
      this.id_team != null
    ) {
      try {
        this.servicio
          .addCompetition(
            _name,
            this.id_team,
            _type,
            _year,
            this.id_country
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
                this.servicio.insertLog('Create Competition: '+ name + ' ');
                Toast.fire({
                  icon: 'success',
                  title: 'Competition created successfully ' + name + ' ' ,
                });
                this.router.navigate(['/empleado/competencia']);
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
