import { Component } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './dropdowns.component.html'
})
export class DropdownsComponent {

  constructor(
    private router: Router, private servicio: RequestService
  ) { }

  ngOnInit(): void {
    this.getSoccerGame();
  }
  soccer_game: any;

  getSoccerGame() {
    try {
      this.servicio.getSoccer_Game().subscribe(
        (res: any) => {
          this.soccer_game = res.data;
          if (this.soccer_game.length > 0) {
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

  deleteSoccer_Game(id_partido: number) {
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
          this.servicio.deleteSoccer_Game(id_partido).subscribe(
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
                title: 'Soccer Game deleted successfully ' + id_partido,
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
