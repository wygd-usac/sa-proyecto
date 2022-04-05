import { Component } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: 'typography.component.html',
})
export class TypographyComponent {
  constructor(private router: Router, private servicio: RequestService) {}

  ngOnInit(): void {
    const rol = localStorage.getItem("rol");
    // @ts-ignore
    if (rol != 1) {
      this.router.navigate(['/404']);
    }
    this.getPersonAll();
  }

  user: any;

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
          this.servicio.deletePerson(id_person).subscribe(
            (res: any) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });
              this.servicio.insertLog('Delete user: '+ name + ' ' + lastname);
              Toast.fire({
                icon: 'success',
                title: 'Person deleted successfully ' + name + ' ' + lastname,
              });
              window.location.reload();
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

  getPersonAll() {
    try {
      this.servicio.getPersonAll().subscribe(
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
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  }
}
