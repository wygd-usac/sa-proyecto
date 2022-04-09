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
  templateUrl: './modals.component.html'
})
export class ModalsComponent {

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
  listTeams2: any;
  listTeams3: any;
  listStadiums: any;
  listCompetitions: any;

  // @ts-ignore
  select: FormGroup;

  ngOnInit(): void {
    const rol = localStorage.getItem("rol");
    // @ts-ignore
    this.getSelects();
    this.select = this.fb.group({
      selectteam: [null],
      selectteam2: [null],
      selectteam3: [null],
      selectstadium: [null],
      selectcompetition: [null],
      selectstatus: [null]
    });
  }

  getSelects() {
    try {
      this.servicio.getCompetition().subscribe(
        (res: any) => {
          this.listCompetitions = res.data;
          if (this.listCompetitions
            .length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );

      this.servicio.getStadiums().subscribe(
        (res: any) => {
          this.listStadiums = res.data;
          if (this.listStadiums.length > 0) {
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

      this.servicio.getTeams().subscribe(
        (res: any) => {
          this.listTeams2 = res.data;
          if (this.listTeams2.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );

      this.servicio.getTeams().subscribe(
        (res: any) => {
          this.listTeams3 = res.data;
          if (this.listTeams3.length > 0) {
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

  id_stadium = 0;
  id_competition = 0;
  id_team = 0;
  id_team2 = 0;
  id_team3 = 0;
  status:string='';

  getSelectedOptions() {
    //console.log(this.selectedstand.value.selectedstand);
    this.id_stadium = this.select.value.selectstadium;
    this.id_team = this.select.value.selectteam;
    this.id_team2 = this.select.value.selectteam2;
    this.id_team3 = this.select.value.selectteam3;
    this.id_competition = this.select.value.selectcompetition;
    this.status = this.select.value.selectstatus;
    //console.log(this.id_country,this.id_stand,this.id_team);
  }

  registrar(
    _game_date: string,
    _attendees: string,
    _result_local: string,
    _result_visiting: string,
    _status:string,
    _incidents: string
  ) {
    this.getSelectedOptions();
    console.log(
      'country: ',
      this.id_competition,
      ' team: ',
      this.id_team,
      ' stand: ',
      this.id_stadium,
    );

    if (
      this.id_stadium != null &&
      this.id_team != null &&
      this.id_competition != null
    ) {
      try {
        this.servicio
          .addSoccerGame(
            _game_date,
            _attendees,
            _result_local,
            _result_visiting,
            this.status,
            this.id_stadium,
            this.id_team,
            this.id_team2,
            _incidents,
            this.id_team3,
            this.id_competition
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
                this.servicio.insertLog('Create Partido: '+ name + ' ');
                Toast.fire({
                  icon: 'success',
                  title: 'Partido created successfully ' + name + ' ' ,
                });
                this.router.navigate(['/empleado/partidos']);
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
