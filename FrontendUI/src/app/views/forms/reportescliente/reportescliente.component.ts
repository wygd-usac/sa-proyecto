import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { arrayBuffer } from 'stream/consumers';

@Component({
  selector: 'app-reportescliente',
  templateUrl: './reportescliente.component.html',
  styleUrls: ['./reportescliente.component.scss']
})
export class ReportesclienteComponent implements OnInit {
  teams:any;
  constructor(private router: Router, private servicio: RequestService) { }
  
  ngOnInit(): void {
    this.getEquipos();
    
    // this.teams.forEach(element => {
    //   console.log(element);
    // });

  }
  imprimirDatos(){
    
    console.log(typeof(this.teams));
    this.teams.forEach(element => {
      console.log(element);
    });
  }


  getEquipos(){
    try {
      this.servicio.getCountries().subscribe(
        (res: any) => {
          
          this.teams = JSON.parse(res.countries);
          if (this.teams.length > 0) {
            //console.log(this.user);
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
