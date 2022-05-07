import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "../../../../services/request.service";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component {

  constructor(private router: Router, private servicio: RequestService) { }

  jsonDataString: any = [{}];

  Jala(texto){
    this.servicio.forzaresb(texto).subscribe((res: any) => {
      alert( JSON.stringify(res) );
      console.log(res);
    })
  }

}
