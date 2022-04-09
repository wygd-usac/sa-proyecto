import {Component, HostListener, Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {RequestService} from '../../../../services/request.service'
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {nivel} from "../_nav";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public profilepic = "./assets/img/avatars/8.png"
  public name =''
  public estado = "success"

  constructor(private classToggler: ClassToggleService, private router: Router, private servicio: RequestService) {
    super();
  }

  clearLocal(){
    this.servicio.insertLog('Logout');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  Logeado(){
    if( localStorage.getItem('rol') === '1' || localStorage.getItem('rol') === '2' || localStorage.getItem('rol') === '3' || localStorage.getItem('rol') === '4' ){
      this.estado = "success";
      // @ts-ignore
      this.profilepic = localStorage.getItem('photo');
      // @ts-ignore
      this.name=localStorage.getItem('full_name');
      return true;
    }else {
      this.estado = "dark";
      return false;
    }
  }

  @HostListener('window:storage')
  onStorageChange() {
    console.log("actualizando menu")
    if(localStorage.getItem('photo') !== undefined){
      // @ts-ignore
      this.profilepic = localStorage.getItem('photo');
    }else {
      this.profilepic = "./assets/img/avatars/8.png"
    }

  }
}
