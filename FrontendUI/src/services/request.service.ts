import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url_server: any;
  url_server_admin: any;

  hedears_whit_token = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*',
    // @ts-ignore
    'Authorization': localStorage.getItem("token") });
  optionsToken = { headers: this.hedears_whit_token };

  hedears_all = new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    })
    optionsAll = { headers: this.hedears_whit_token };


  constructor(private http: HttpClient) {
    //this.url_server = 'http://34.132.139.69:5000/';
    //this.url_server_admin = 'http://34.132.139.69:5002/';
    // this.url_server = environment.example; 34.133.92.54
    this.url_server = environment.base_url;
    this.url_server_admin = environment.base_url;
  }

  //Bitacora
  getLog():any{
    return this.http.get(this.url_server + 'esb/administrator/reporte/log', {});
  }

  newLog(id_administrador:number,accion:string,is_error:number):any{
    return this.http.post(this.url_server_admin + 'esb/administrator/reporte/log/',
      {id_administrador:id_administrador,accion:accion,is_error:is_error})
  }

  insertLog(accion:string){
    let error:number=0;
    if (accion=='')error=1;
    const rol = localStorage.getItem("rol");
    const id_user = localStorage.getItem("id_user");
    // @ts-ignore
    if (rol==1){
      try {
        // @ts-ignore
        this.newLog(id_user,accion,error).subscribe((res: any) => {
            if (res.status == 200) {
              //console.log('Log');
            } else {
            }
          }
          ,
          err => {
          }
        );
      } catch (e) {
      }
    }
  }

  //Reportes
  getSubsByTeam(id:number):any{
    return this.http.get(this.url_server + 'esb/reporte/suscribe/?id='+id, {});
  }

  getUserByCountry(id:number):any{
    return this.http.get(this.url_server + 'esb/reporte/country/?id='+id, {});
  }

  getUserMembership():any{
    return this.http.get(this.url_server + 'esb/reporte/membership', {});
  }

  getUserExpenses():any{
    return this.http.get(this.url_server + 'esb/reporte/expenses', {});
  }

  getUserByGenre(id:string):any{
    return this.http.get(this.url_server + 'esb/reporte/genre/?genero='+id, {});
  }

  getUserByAge(id:number):any{
    return this.http.get(this.url_server + 'esb/reporte/age/?edad='+id, {});
  }

  getUserMembershipTop():any{
    return this.http.get(this.url_server + 'esb/reporte/memberships', {});
  }

  getNewsByTeam(id:number):any{
    return this.http.get(this.url_server + 'esb/reporte/news/team/?equipo='+id, {});
  }

  getNews():any{
    return this.http.get(this.url_server + 'esb/reporte/news', {});
  }

  //Estadios
  getStadiums(): any{
    return this.http.get(this.url_server + 'esb/servicio_administrativo/stadium', {});
  }

  deleteStadium(id:number):any{
    return this.http.delete(this.url_server + 'esb/servicio_administrativo/stadium/?id='+id, {})
  }

  addStadium(
    _name: any,
    _fundation_date: any,
    _photo: any,
    _capacity: any,
    _state: any,
    _address: any,
    _id_country: any
  ){
    return this.http.post(this.url_server + 'esb/servicio_administrativo/stadium', {
      name: _name,
      fundation_date : _fundation_date,
      photo: _photo,
      capacity: _capacity,
      state: _state,
      address: _address,
      id_country:_id_country
    })
  }

  //Partido
  getSoccer_Game(): any{
    return this.http.get(this.url_server + 'esb/servicio_administrativo/soccer-game', {})
  }

  getTransfer(): any{
    return this.http.get(this.url_server + 'esb/servicio_administrativo/transfer-log', {})
  }

  deleteSoccer_Game(id:number):any{
    return this.http.delete(this.url_server + 'esb/servicio_administrativo/soccer-game/?id='+id, {})
  }

  addSoccerGame(
    _game_date:any,
    _attendees:any,
    _result_local: any,
    _result_visiting:any,
    _state:any,
    _id_stadium:any,
    _id_team_local:any,
    _id_team_visiting:any,
    _incidents:any,
    _id_winner:any,
    _id_competicion:any
  ){
    return this.http.post(this.url_server + 'esb/servicio_administrativo/soccer-game', {
      game_date: _game_date,
      attendees: _attendees,
      result_local: _result_local,
      result_visiting: _result_visiting,
      state: _state,
      id_stadium: _id_stadium,
      id_team_local: _id_team_local,
      id_team_visiting: _id_team_visiting,
      incidents: _incidents,
      id_winner: _id_winner,
      id_competicion: _id_competicion
    })
  }

  //Equipo
  getTeam(): any{
    return this.http.get(this.url_server + 'esb/servicio_administrativo/team', {})
  }

  deleteTeam(id:number):any{
    return this.http.delete(this.url_server + 'esb/servicio_administrativo/team/?id='+id, {})
  }

  addTeam(
    _name: any,
    _fundation_date: any,
    _id_country: any,
    _photo: any
  ){
    return this.http.post(this.url_server + 'esb/servicio_administrativo/team', {
      name: _name,
      fundation_date : _fundation_date,
      id_country:_id_country,
      photo: _photo
    })
  }

  getListStadiums(): any{
    return this.http.get(this.url_server_admin + 'esb/servicio_administrativo/estadio', {})
  }

  getListCompetition(): any{
    return this.http.get(this.url_server_admin + 'esb/servicio_administrativo/competencia', {})
  }

  //Competencia
  getCompetition(): any{
    return this.http.get(this.url_server + 'esb/servicio_administrativo/competition', {})
  }

  deleteCompetition(id:number):any{
    return this.http.delete(this.url_server + 'esb/servicio_administrativo/competition/?id='+id, {})
  }

  addCompetition(
    _name: any,
    _champion_team: any,
    _type: any,
    _year: any,
    _country:any
  ){
    return this.http.post(this.url_server + 'esb/servicio_administrativo/competition', {
      name: _name,
      champion_team: _champion_team,
      type: _type,
      year: _year,
      county: _country
    })
  }


  getCountrys(): any{
    return this.http.get(this.url_server_admin + 'esb/administrator/country/', {})
  }

  getTeams(): any{
    return this.http.get(this.url_server_admin + 'esb/administrator/team/', {})
  }

  getStands(): any{
    return this.http.get(this.url_server_admin + 'esb/administrator/stand/', {})
  }

  getPersonAll(): any{
    return this.http.get(this.url_server_admin + 'esb/administrator/persona/', {})
  }

  deletePerson(id:number):any{
    return this.http.delete(this.url_server_admin + 'esb/administrator/persona?id='+id, {})
  }

  newPerson(name:string,lastname:string,birthday:string,nationality:number,id_stand:number,
            status:string,id_team:number,photo:string,type:number):any{
    return this.http.post(this.url_server_admin + 'esb/administrator/persona/',
      {name:name,lastname:lastname,birthday:birthday,nationality:nationality,id_stand:id_stand,
        status:status,id_team:id_team,photo:photo,type:type})
  }

  loginUser( _email: any, _password: any ): any{
    return this.http.post(this.url_server + 'esb/usuario/login/', {email: _email , password: _password})
  }

  getUser(){
    return this.http.get( this.url_server + 'esb/usuario/get?id='+localStorage.getItem('idu'))
  }

  getUsers(){
    return this.http.get( this.url_server + 'esb/administrator/users', {})
  }

  deleteUserAdmin(id_user:number){
    return this.http.delete( this.url_server + 'esb/administrator/users/delete?id='+id_user,{  } )
  }

  editUser( user ){
    console.log(user);

    return this.http.post(  this.url_server + 'esb/usuario/update' , {
      id_user: user.id_user,
      name: user.name,
      last_name: user.last_name,
      password: user.password,
      phone: user.phone,
      gender: user.gender,
      birth_date: user.birth_date,
      // @ts-ignore
      photo : user.photo}, this.hedears_whit_token)
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
      // @ts-ignore
    }, this.optionsAll)
  }

  getCountries():any{
    return this.http.get(this.url_server_admin + 'esb/client/countries', {})
  }

  getTeamPersons(_id_team:number):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/person/?id_team='+_id_team, {})
  }

  getPersonsLower(_age:number):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/person/lower/?edad='+_age, {})
  }

  getPersonsHigher(_age:number):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/person/higher/?edad='+_age, {})
  }

  getTeamsHistoryPerson(_id_person:number):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/team/person/?persona='+_id_person, {})
  }

  getTeamNotifications(_id_team:number):any{
    return this.http.get(this.url_server_admin + 'esb/client/notifications?id='+_id_team, {})
  }

  setFollow(_id_team:number,_id_client:number):any{
    return this.http.post(this.url_server_admin + 'esb/client/follow',
      {id_client:_id_client,id_team:_id_team})
  }

  getEquiposCompetition(_id_competition):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/competition/team/?competicion='+_id_competition, {})
  }

  getEquiposPais(_id_pais):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/country/team/?pais='+_id_pais, {})
  }

  getEstadiosPais(_id_pais):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/country/stadium/?pais='+_id_pais, {})
  }

  getEstadiosCapacidad(_capacidad):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/stadium/capacity/?capacidad='+_capacidad, {})
  }

  getEquiposAntiguedad(_age):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/team/age/?edad='+_age, {})
  }

  getPartidosGoles(_goles):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/game/goal/?goals='+_goles, {})
  }

  getPartidosAnios(_anio):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/games/year?anio='+_anio, {})
  }

  getPartidosXY(_ex,_ey):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/games/teams?local='+_ex+'&visitante='+_ey, {})
  }

  setQuiniela(c,q,r1,r2):any{
    return this.http.post(this.url_server_admin + 'esb/client/quiniela',
      {id_client:c,id_game:q,result_1:r1,result_2:r2})
  }

  getIncidenciasCompeticion(competicion,anio):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/person/competition/incidents/?competicion='+competicion+'&anio='+anio,{})
  }

  getVictorias(equipo):any{
    return this.http.get(this.url_server_admin + 'esb/client/reports/team/competitions?equipo='+equipo,{})
  }

  setPremium(user):any{
    return this.http.patch(this.url_server_admin + 'esb/client/membership', {id_client:user})
  }

  deleteUser(){
    return this.http.post( this.url_server + 'esb/usuario/delete',
      // @ts-ignore
      { id_user : parseInt(localStorage.getItem('idu')) },  this.optionsToken )
  }

  restablecer( email ){
    // @ts-ignore
    return this.http.post( this.url_server + 'esb/usuario/restablecer', { email: email }, this.optionsAll);
  }

}
