import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../../services/request.service';
@Component({
  selector: 'app-cliente-equipo',
  templateUrl: './cliente-equipo.component.html',
  styleUrls: ['./cliente-equipo.component.scss']
})
export class ClienteEquipoComponent implements OnInit {
  valor: number=1;
  listStands:any;
  listTeams:any;
  listCountrys:any;
  constructor(private servicio: RequestService) { 

  }

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
}
