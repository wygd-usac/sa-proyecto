import {Component, HostBinding, Input, OnInit, Renderer2, VERSION, ViewChildren, ElementRef, QueryList} from '@angular/core';
import {RequestService} from '../../../services/request.service'
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import Swal from 'sweetalert2'

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent {

  constructor(private renderer: Renderer2, private router: Router,
    private servicio: RequestService, private storage: AngularFireStorage
  ) {
  }
  @ViewChildren("selectstand") selectstand: QueryList<ElementRef> | undefined;

  uploadPercent: Observable<number> | undefined;
  // @ts-ignore
  urlImage: Observable<string>;

  listStands:any;
  listTeams:any;
  listCountrys:any;


  ngOnInit(): void {
     this.getSelects();
  }

  getSelects(){
    try {
      this.servicio.getStands().subscribe((res: any) => {
          this.listStands=res.data;
          if (this.listStands.length>0){
          }
        }
        ,
        err => {
          console.log(err);
        }
      );

      this.servicio.getCountrys().subscribe((res: any) => {
          this.listCountrys=res.data;
          if (this.listCountrys.length>0){
          }
        }
        ,
        err => {
          console.log(err);
        }
      );

      this.servicio.getTeams().subscribe((res: any) => {
          this.listTeams=res.data;
          if (this.listTeams.length>0){
          }
        }
        ,
        err => {
          console.log(err);
        }
      );
    } catch (e) {
    }
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // @ts-ignore
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

  }

  id_country=0;
  id_stand=0;
  id_team=0;
  getSelectedCountry(id:number){
    this.id_country=id;
  }

  getSelectedStand(stand:any){
    this.id_stand=stand.id_stand;
    console.log(this.id_stand,' ',stand.stand);
  }

  getSelectedTeam(id:number){
    this.id_team=id;
  }

  registrar(name:string,lastname:string,birthday:string,
            status:string,photo:string) {
    console.log('country: ',this.id_country,' team: ',this.id_team,' stand: ', this.id_stand);
    // @ts-ignore
    //console.log(this.selectstand.nativeElement.getElementById('id_stand'));
    if (this.id_country!=0 && this.id_team!=0 && this.id_stand!=0)
    {
      try {
        this.servicio.newPerson(name,lastname,birthday,this.id_country,this.id_stand,status,this.id_team,photo
        ).subscribe((res: any) => {
            if (res.msg != undefined) {

            } else {

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
}

@Component({
  selector: 'app-theme-color',
  template: `
    <c-col xl='2' md='4' sm='6' xs='12' class='my-4 ms-4'>
      <div [ngClass]='colorClasses' style='padding-top: 75%;'></div>
      <ng-content></ng-content>
    </c-col>
  `
})
export class ThemeColorComponent implements OnInit {
  @Input() color = '';
  public colorClasses = {
    'theme-color w-75 rounded mb-3': true
  };

  @HostBinding('style.display') display = 'contents';

  ngOnInit(): void {
    this.colorClasses = {
      ...this.colorClasses,
      [`bg-${this.color}`]: !!this.color
    };
  }
}

