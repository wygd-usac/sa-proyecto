import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RequestService} from '../../../../services/request.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
