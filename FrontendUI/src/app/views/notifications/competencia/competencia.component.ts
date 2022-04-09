import { Component } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './competencia.component.html'
})
export class CompetenciaComponent{

  constructor(
    private router: Router, private servicio: RequestService
  ) { }

  ngOnInit(): void {
    this.getCompetition();
  }
  competition: any;

  getCompetition() {
    try {
      this.servicio.getCompetition().subscribe(
        (res: any) => {
          this.competition = res.data;
          if (this.competition.length > 0) {
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

  deleteCompetition(id_competencia: number, name: string) {
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
          this.servicio.deleteCompetition(id_competencia).subscribe(
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
                title: 'Competition deleted successfully ' + name,
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
