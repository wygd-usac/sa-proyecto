import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {RequestService} from "../../../../services/request.service";

@Component({
  selector: 'app-widgets-brand',
  templateUrl: './widgets-brand.component.html',
  styleUrls: ['./widgets-brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsBrandComponent  {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,private router: Router, private servicio: RequestService
  ) {}
  user:any;
  ngOnInit(): void {
    const rol = localStorage.getItem("rol");
    // @ts-ignore
    if (rol != 1) {
      this.router.navigate(['/404']);
    }
    this.getPersonAll();
  }

  getPersonAll() {
    try {
      this.servicio.getUsers().subscribe(
        (res: any) => {
          this.user = res.data;
          if (this.user.length > 0) {
            //console.log(this.user);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {

    }
    console.log(this.user);
  }



  editPerson(id: number) {}

  deletePerson(id_person: number, name: string, lastname: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d9045',
      cancelButtonColor: '#a42828',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.servicio.deleteUserAdmin(id_person).subscribe(
            (res: any) => {
              console.log(res);
              const Toast = Swal.mixin({
                position: 'center',
                toast: true,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });
              this.servicio.insertLog('Delete Person: '+ name + ' ' + lastname);
              Toast.fire({
                icon: 'success',
                title: 'Person deleted successfully ' + name + ' ' + lastname,
              });
              //window.location.reload();
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
    });
  }

}
