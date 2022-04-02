import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions : any    = {
  headers: new HttpHeaders({
    //'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url_server: any;
  url_server_admin: any;
  url_server_online: any;

  constructor(private http: HttpClient) {
    this.url_server = 'http://localhost:5000/';
    this.url_server_admin = 'http://localhost:5002/';
    this.url_server_online= 'http://34.132.139.69:5000/';
    // this.url_server = environment.example;
  }

  getCountrys(): any{
    return this.http.get(this.url_server_admin + 'esb/administracion/country/', {})
  }

  getTeams(): any{
    return this.http.get(this.url_server_admin + 'esb/administracion/team/', {})
  }

  getStands(): any{
    return this.http.get(this.url_server_admin + 'esb/administracion/stand/', {})
  }

  getPersonAll(): any{
    return this.http.get(this.url_server_admin + 'esb/administracion/persona/', {})
  }

  deletePerson(id:number):any{
    return this.http.delete(this.url_server_admin + 'esb/administracion/persona?id='+id, {})
  }

  newPerson(name:string,lastname:string,birthday:string,nationality:number,id_stand:number,
            status:string,id_team:number,photo:string):any{
    return this.http.put(this.url_server_admin + 'esb/administracion/persona', {name:name,lastname:lastname,
            birthday:birthday,nationality:nationality,id_stand:id_stand,status:status,id_team:id_team,photo:photo})
  }

  loginUser( _email: any, _password: any ): any{
    return this.http.post(this.url_server + 'esb/usuario/login/', {email: _email , password: _password})
  }

  registrerUser(
    _name: any,
    _last_name: any,
    _password: any,
    _email: any,
    _phone: any,
    _photo: any,
    _gender: any,
    _birth_date: any,
    _address: any,
    _id_Country: any,
    _type: any
  ){
    return this.http.post(this.url_server + 'esb/usuario/add/', {
      name: _name,
      last_name: _last_name,
      password: _password,
      email: _email,
      phone: _phone,
      photo: _photo,
      gender: _gender,
      birth_date: _birth_date,
      address: _address,
      id_Country: _id_Country,
      type: _type
    })
  }

}
