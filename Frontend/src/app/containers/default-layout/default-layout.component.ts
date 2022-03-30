import {Component, HostListener} from '@angular/core';
import {nivel} from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public navItems = nivel();

  constructor() {
    this.navItems = nivel();
  }

  ngOnInit(): void{
    this.navItems = nivel();
  }

  @HostListener('window:storage')
  onStorageChange() {
    console.log("actualizando menu")
    this.navItems = nivel();
  }

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
}
