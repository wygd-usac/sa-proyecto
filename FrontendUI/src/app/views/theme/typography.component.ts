import {Component} from '@angular/core';
import {RequestService} from '../../../services/request.service'
import {Router} from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  templateUrl: 'typography.component.html',
})
export class TypographyComponent {
  constructor(private router: Router, private servicio: RequestService) {
  }

  ngOnInit(): void {
    this.getPersonAll();
  }

  user: any;

  deletePerson(id_person:number,name:string,lastname:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.servicio.deletePerson(id_person).subscribe((res: any) => {
              Swal.fire(
                'Deleted!',
                'Se elimino el jugador o DT: '+name+' '+lastname,
                'success'
              )
            }
            ,
            err => {
              console.log(err);
            }
          );
        } catch (e) {
          Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }

      }
    })

  }

  getPersonAll() {
    try {
      this.servicio.getPersonAll().subscribe((res: any) => {

          this.user=res.data;
          if (this.user.length>0){
            console.log(this.user);
          }
        }
        ,
        err => {
          console.log(err);
        }
      );
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }
}
