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
import { RequestService } from '../../../services/request.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: 'colors.component.html',
})
export class ColorsComponent {
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

  listStands: any;
  listTeams: any;
  listCountrys: any;

  // @ts-ignore
  select: FormGroup;

  ngOnInit(): void {
    const rol = localStorage.getItem("rol");
    // @ts-ignore
    if (rol != 1) {
      this.router.navigate(['/404']);
    }
    this.getSelects();
    this.select = this.fb.group({
      selectstand: [null],
      selectteam: [null],
      selectcountry: [null],
    });
  }

  getSelects() {
    try {
      this.servicio.getStands().subscribe(
        (res: any) => {
          this.listStands = res.data;
          if (this.listStands.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );

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
  id_stand = 0;
  id_team = 0;

  getSelectedOptions() {
    //console.log(this.selectedstand.value.selectedstand);
    this.id_stand = this.select.value.selectstand;
    this.id_team = this.select.value.selectteam;
    this.id_country = this.select.value.selectcountry;
    //console.log(this.id_country,this.id_stand,this.id_team);
  }

  registrar(
    name: string,
    lastname: string,
    birthday: string,
    status: string,
    photo: string
  ) {
    this.getSelectedOptions();
    console.log(
      'country: ',
      this.id_country,
      ' team: ',
      this.id_team,
      ' stand: ',
      this.id_stand,
      photo
    );

    if (
      this.id_country != null &&
      this.id_team != null &&
      this.id_stand != null
    ) {
      try {
        this.servicio
          .newPerson(
            name,
            lastname,
            birthday,
            this.id_country,
            this.id_stand,
            status,
            this.id_team,
            photo,
            1
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
                this.servicio.insertLog('Create Person: '+ name + ' ' + lastname);
                Toast.fire({
                  icon: 'success',
                  title: 'Person created successfully ' + name + ' ' + lastname,
                });
                this.router.navigate(['/administracion/persona/ver']);
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
                text: err,
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

@Component({
  selector: 'app-theme-color',
  template: `
    <c-col xl="2" md="4" sm="6" xs="12" class="my-4 ms-4">
      <div [ngClass]="colorClasses" style="padding-top: 75%;"></div>
      <ng-content></ng-content>
    </c-col>
  `,
})
export class ThemeColorComponent implements OnInit {
  @Input() color = '';
  public colorClasses = {
    'theme-color w-75 rounded mb-3': true,
  };

  @HostBinding('style.display') display = 'contents';

  ngOnInit(): void {
    this.colorClasses = {
      ...this.colorClasses,
      [`bg-${this.color}`]: !!this.color,
    };
  }
}
