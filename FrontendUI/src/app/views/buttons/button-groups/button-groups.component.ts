import { Component } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './button-groups.component.html'
})

export class ButtonGroupsComponent {

  constructor(
    private router: Router, private servicio: RequestService,
    private fb: FormBuilder
  ) { }
  // @ts-ignore
  select: FormGroup;
  listTeams:any;
  listNewsByTeam:any;
  listNews:any;
  listLog:any;
  listSubsByTeam:any;
  id_team = 0;
  order=0;

  ngOnInit(): void {
    const rol = localStorage.getItem("rol");
    // @ts-ignore
    if (rol != 1) {
      this.router.navigate(['/404']);
    }
    this.getStadiums();
    this.select = this.fb.group({
      selectstand: [null],
      selectteam: [null],
      selectcountry: [null],
      selectgenre:[null]
    });
    this.getSelects();
    this.getNews()
    this.getBitacora()
  }

  getNews(){
    try {
      this.servicio.getNews().subscribe(
        (res: any) => {
          this.listNews = res.data;
          if (this.listNews.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {console.info('Error al cargar los equipos')}
  }

  getBitacora(){
    try {
      this.servicio.getLog().subscribe(
        (res: any) => {
          this.listLog = res.data;
          if (this.listLog > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {console.info('Error al cargar los datos')}
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
    } catch (e) {console.info('Error al cargar los equipos')}
  }

  buscar(){
    this.order = 0;
    this.id_team = this.select.value.selectteam;
    try {
      this.servicio.getReport9(this.id_team,this.order).subscribe(
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

 stadium: any;

  getStadiums() {
    try {
      this.servicio.getStadiums().subscribe(
        (res: any) => {
          this.stadium = res.data;
          if (this.stadium.length > 0) {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  }

  deleteStadium(id_Estadio: number, name: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d9045',
      cancelButtonColor: '#a42828',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.servicio.deleteStadium(id_Estadio).subscribe(
            (res: any) => {
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

              Toast.fire({
                icon: 'success',
                title: 'Stadium deleted successfully ' + name,
              });
              window.location.reload();
            },
            (err) => {
              console.log(err);
            }
          );
        } catch (e) {
          Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool',
          });
        }
      }
    });
  }


}
