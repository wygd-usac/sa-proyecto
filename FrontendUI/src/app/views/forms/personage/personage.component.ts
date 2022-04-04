import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personage',
  templateUrl: './personage.component.html',
  styleUrls: ['./personage.component.scss']
})
export class PersonageComponent implements OnInit {
  tiporeporte!:string;
  age!:number;
  persons:any;
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
}
