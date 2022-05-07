
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clienteteam',
  templateUrl: './clienteteam.component.html',
  styleUrls: ['./clienteteam.component.scss']
})
export class ClienteteamComponent implements OnInit {
  listTeams:any;
  equipoSeleccionado!:number;
  isPlayer!:number;
  equipoX!:string;
  equipoY!:string;
  constructor(private router: Router, private servicio: RequestService) { }

  ngOnInit(): void {
    this.loadTeams();
    
  }
  teamPersons:any;
  verPersonas(){
    
    this.servicio.getTeamPersons(this.equipoSeleccionado,this.isPlayer).subscribe(
      (res: any) => {
        console.log(res);
        this.teamPersons = res.data;
        console.log(this.teamPersons);
      },
      (err) => {
        console.log(err);
      }
    );
    console.log("Listado personas de :" + this.equipoSeleccionado);
  }

  teamGames:any;
  verPartidos(){
    
    this.servicio.getTeamGamesHistory(this.equipoSeleccionado).subscribe(
      (res: any) => {
        console.log(res);
        this.teamGames = res.data;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    console.log("Listado personas de :" + this.equipoSeleccionado);
  }


  // @ts-ignore
  select: FormGroup;
  id_team=0;
  imprimirEquipos(){
    console.log(this.equipoSeleccionado);
  }
  loadTeams(){
    this.servicio.getTeams().subscribe(
      (res: any) => {
        this.listTeams = res.data;
        if (this.listTeams.length > 0) {
          console.log(this.listTeams);
          this.equipoSeleccionado = (this.listTeams[0].id_team).toString();
          this.equipoX = (this.listTeams[0].id_team).toString();
          this.equipoY = (this.listTeams[0].id_team).toString();
        }
        
      },
      (err) => {
        console.log(err);
      }
    );

  }
  
  notifications:any;
  verNotificaciones(){
    this.servicio.getTeamNotifications(this.equipoSeleccionado).subscribe(
      (res: any) => {
        this.notifications = res.data;
        console.log(this.notifications);
      },
      (err) => {
        console.log(err);
      }
    );
    console.log("Listado notificaciones de :" + this.equipoSeleccionado);

  }

  follow(){
    let user = Number(localStorage.getItem('idu')) || 1;
    this.servicio.setFollow(this.equipoSeleccionado,user).subscribe(
      (res: any) => {
        console.log(res.msj);
        Swal.fire(
          'Siguiendo al Equipo!',
          res.msj,
          'success'
        )
      },
      (err) => {
        console.log(err);
      }
    );
  }


  competicion!:number;
  equiposC:any;
  buscarEquipos(){
    console.log(this.competicion);
    this.servicio.getEquiposCompetition(this.competicion).subscribe(
      (res: any) => {
        this.equiposC = res.data;
        console.log(this.equiposC);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  pais!:number;
  equiposPais:any;
  buscarEquiposPais(){
    console.log(this.pais);
    this.servicio.getEquiposPais(this.pais).subscribe(
      (res: any) => {
        this.equiposPais = res.data;
        console.log(this.equiposPais);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  estadiosPais:any;
  buscarEstadiosPais(){
    console.log(this.pais);
    this.servicio.getEstadiosPais(this.pais).subscribe(
      (res: any) => {
        this.estadiosPais = res.data;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  capacidad!:number;
  estadiosCapacidad:any;
  buscarEstadiosCapacidad(){
    console.log(this.pais);
    this.servicio.getEstadiosCapacidad(this.capacidad).subscribe(
      (res: any) => {
        this.estadiosCapacidad = res.data;
        console.log(this.estadiosCapacidad);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  equiposAntiguedad:any;
  buscarEquiposAntiguedad(){
    console.log(this.capacidad);
    this.servicio.getEquiposAntiguedad(this.capacidad).subscribe(
      (res: any) => {
        this.equiposAntiguedad = res.data;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  partidosGoles:any;
  buscarPartidosGoles(){
    console.log(this.capacidad);
    this.servicio.getPartidosGoles(this.capacidad).subscribe(
      (res: any) => {
        this.partidosGoles = res.data;
        console.log(this.partidosGoles);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  partidosAnio:any;
  buscarPartidosAnios(){
    console.log(this.capacidad);
    this.servicio.getPartidosAnios(this.capacidad).subscribe(
      (res: any) => {
        this.partidosAnio = res.data;
        console.log(this.partidosAnio);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  partidosXY:any;
  verPartidosXY(){
    this.servicio.getPartidosXY(this.equipoX,this.equipoY).subscribe(
      (res: any) => {
        console.log(res);
        this.partidosXY = res.data;
        console.log(this.partidosXY);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
