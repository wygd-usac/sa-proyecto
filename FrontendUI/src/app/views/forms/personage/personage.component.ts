import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AnyAaaaRecord } from 'dns';

@Component({
  selector: 'app-personage',
  templateUrl: './personage.component.html',
  styleUrls: ['./personage.component.scss']
})
export class PersonageComponent implements OnInit {
  tiporeporte!:string;
  age!:number;
  persons:any;
  private isPremium = false;
  options = [
    {id:1,description:"Menor que"},
    {id:2,description:"Mayor que"}
  ];
  constructor(private router: Router, private servicio: RequestService) { }

  ngOnInit(): void {
    this.tiporeporte = this.options[0].id.toString();
    this.age = 19;
  }

  buscarPersonas(){
    console.log(this.age);
    console.log(this.tiporeporte);
    console.log(typeof(this.tiporeporte));
    switch(this.tiporeporte){
      case "1":
        this.loadPersonsLower();
        break;
      case "2":
        this.loadPersonsHigher();
        break;
    }
  }

  loadPersonsLower(){
    this.servicio.getPersonsLower(this.age).subscribe(
      (res: any) => {
        this.persons = res.data;
        console.log(this.persons);
      },
      (err) => {
        console.log(err);
      }
    );

  }
  loadPersonsHigher(){
    this.servicio.getPersonsHigher(this.age).subscribe(
      (res: any) => {
        this.persons = res.data;
        console.log(this.persons);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  equipos:any;
  verEquiposPersona(id_p:number){
    console.log(id_p);
    this.servicio.getTeamsHistoryPerson(id_p).subscribe(
      (res: any) => {
        this.equipos = res.data;
        console.log(this.equipos);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  result_1!:number;
  result_2!:number;
  id_quiniela!:number;
  guardarQuiniela(){
    let user = Number(localStorage.getItem('idu')) || 0;
    this.servicio.setQuiniela(user,this.id_quiniela,this.result_1,this.result_2).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire('Quiniela almacenada',res.msj,'success');
      },
      (err) => {
        console.log(err);
        Swal.fire('Error al almacenar la quiniela',err.msj,'warning');
      }
    );
  }


  competicion_id!:number;
  anio!:number;
  personsI:any;
  getJugadoresIncidencias(){
    
    this.servicio.getIncidenciasCompeticion(this.competicion_id,this.anio).subscribe(
      (res: any) => {
        console.log(res);
        console.log(res.data);
        this.personsI = res.data;
      },
      (err) => {
        console.log(err);
        Swal.fire('Error al almacenar la quiniela',err.msj,'warning');
      }
    );
  }

  equipo!:number;
  buscarWinnings(){
    this.servicio.getVictorias(this.equipo).subscribe(
      (res: any) => {
        console.log(res);
        console.log(res.data);
        if(res.data.length > 0){
          Swal.fire("Competiciones ganadas por "+ res.data.name,"Ha ganado "+res.data.total_competitions,'success');
        }else{
          Swal.fire("Competiciones ganadas :","Ha ganado 0 competiciones",'success');
        }
        
      },
      (err) => {
        console.log(err);
        Swal.fire('Error al almacenar la quiniela',err.msj,'warning');
      }
    );
  }

  serPremium(){
    let user = Number(localStorage.getItem('idu')) || 0;
    this.servicio.setPremium(user).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire('Ahora eres Premium!',res.msj,'success');
      },
      (err) => {
        console.log(err);
        Swal.fire('Error al almacenar la quiniela',err.data.msj,'warning');
      }
    );
  }
}
