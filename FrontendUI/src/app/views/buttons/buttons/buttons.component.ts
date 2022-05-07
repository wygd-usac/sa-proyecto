import {Component, Renderer2} from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  // @ts-ignore
  select: FormGroup;
  constructor(private renderer: Renderer2,
              private router: Router,
              private servicio: RequestService,
              private storage: AngularFireStorage,
              private fb: FormBuilder) { }
  listTeams: any;
  listCountrys:any;
  id_team = 0;
  id_country=0;
  genre='';
  age=0;
  listSubsByTeam:any;
  listUserMembership:any;
  listUserMembershipTop:any;
  listUserByCountry:any;
  listUserExpenses:any;
  listUserByGenre:any;
  listUserByAge:any;

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
      selectgenre:[null]
    });
    this.getUserMembership();
    this.getUserExpenses();
  }

  getSelects(){
    try {
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
    } catch (e) {console.info('Error al cargar los equipos')}
  }

  getUserMembership(){
    //console.log('membresias')
    try {
      this.servicio.getUserMembership().subscribe(
        (res: any) => {
          this.listUserMembership = res.data;
          //console.log(res)
          if (this.listUserMembership.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {console.info('Error al cargar los usuarios con membresia')}

    try {
      this.servicio.getUserMembershipTop().subscribe(
        (res: any) => {
          this.listUserMembershipTop = res.data;
          if (this.listUserMembershipTop.length > 0) {
            //console.info('Info loaded');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {console.info('Error al cargar los usuarios con membresia')}

  }

  buscar(){
    this.id_team = this.select.value.selectteam;
    try {
      this.servicio.getReport1(this.id_team).subscribe(
        (res: any) => {
          this.listSubsByTeam = res.data;
          if (this.listSubsByTeam.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {console.info('Error al cargar los equipos')}
  }

  buscarUser(){
    this.id_country = this.select.value.selectcountry;
    try {
      this.servicio.getUserByCountry(this.id_country).subscribe(
        (res: any) => {
          console.log(res);
          this.listUserByCountry = res.data;
          if (this.listUserByCountry.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {console.info('Error al cargar los equipos')}
  }

  getUserExpenses(){
    try {
      this.servicio.getUserExpenses().subscribe(
        (res: any) => {
          console.log(res);
          this.listUserExpenses = res.data;
          if (this.listUserExpenses.length > 0) {
            //console.info('Info loaded');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {console.info('Error al cargar los usuarios con membresia')}
  }

  buscarUserbyGenre(){
    this.genre = this.select.value.selectgenre;
    try {
      this.servicio.getUserByGenre(this.genre).subscribe(
        (res: any) => {
          console.log(res);
          this.listUserByGenre = res.data;
          if (this.listUserByGenre.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {console.info('Error al cargar los equipos')}
  }

  buscarUserbyAge(edad:string){
    console.log(edad);
    //this.genre = this.select.value.selectgenre;
    try {
      this.servicio.getUserByAge(Number(edad)).subscribe(
        (res: any) => {
          console.log(res);
          this.listUserByAge = res.data;
          if (this.listUserByAge.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {console.info('Error al cargar los equipos')}
  }
}
