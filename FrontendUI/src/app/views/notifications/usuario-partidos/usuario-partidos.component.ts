import { Component } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-partidos',
  templateUrl: './usuario-partidos.component.html',
  styleUrls: ['./usuario-partidos.component.scss']
})
export class UsuarioPartidosComponent {

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
  

}
