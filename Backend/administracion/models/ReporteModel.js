const conexion = require("./db");

const Reporte = function (reporte) {
  this.equipo = persona.equipo;
  this.id_user = persona.id_user;
  this.name = persona.name;
  this.lastname = persona.lastname;
  this.membership = persona.membership;
  this.expenses = persona.expenses;
  this.status = persona.status;
  this.id_team = persona.id_team;
  this.photo = persona.photo;
};

Reporte.findnewsByTeam = (id,order, result) => {
    var query = `select u.id_user as 'id', u.name, u.lastname, c.country as 'nationality', u.photo, count(n.id_new) as count  from Usuario u
    join Noticia n on u.id_user = n.empleado
    join Equipo E on n.Equipo_id_team = E.id_team
    join Country c on u.id_Country = c.id_Country
      where u.id_rol=2 and n.empleado=u.id_user and E.id_team = ${id}
      group by u.id_user, u.name, u.lastname,u.photo,c.country order by count `;

      if(order == 1){
        query += 'ASC'
      }else{
        query += 'DESC'
      }

    conexion.query(
        query,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // no se encontró el id
          result(
            {
              kind: "Error al obtener empleados con mas o menos noticias publicadas de x equipo.",
            },
            null
          );
          return;
        }
        result(null, res);
      }
    );
  };
  
  Reporte.findexpenses = (id, result) => {
    conexion.query(
      `select id_user as 'id', name, lastname,c.nicename as 'nationality',
      u.photo , 
      (membership*10) as 'amount' 
      from Usuario u
      Join Country c 
      On u.id_Country = c.id_Country 
      where membership>0
      order by u.membership desc`,
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // no se encontró el id
          result(
            {
              kind: "Ocurrió un error al obtener el dinero gastado.",
            },
            null
          );
          return;
        }
        result(null, res);
      }
    );
  };

  Reporte.findcountry = (id, result) => {
    conexion.query(
      `select u.id_user as 'id', u.name, u.lastname, u.photo from Usuario u
      join Country c on u.id_Country = c.id_Country
      where c.id_Country= ?`,
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // no se encontró el id
          result(
            {
              kind: "Ocurrió un error al obtener los usuarios por pais.",
            },
            null
          );
          return;
        }
        result(null, res);
      }
    );
  };

  Reporte.findgenre = (id, result) => {
    conexion.query(
      `select u.id_user as 'id', u.name, u.lastname,
            case when u.genre = 'M' then 'Masculino'
                when u.genre = 'F' then 'Femenino'
                when u.genre = 'U' then 'Transformer'
            end as genre,u.photo,c.nicename as 'nationality'
          from Usuario u
          Join Country c
          On u.id_Country = c.id_Country
        where genre= ?`,
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // no se encontró el id
          result(
            {
              kind: "Ocurrió un error al obtener los usuarios por genero.",
            },
            null
          );
          return;
        }
        result(null, res);
      }
    );
  };


  Reporte.findage = (id, result) => {
    conexion.query(
      `select u.id_user as 'id',u.name,u.lastname,c.nicename as 'nationality', u.photo,u.birthday,
      TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) AS age
        from Usuario u
        Join Country c
        On u.id_Country = c.id_Country
        where TIMESTAMPDIFF(YEAR, birthday, CURDATE())>=?`,
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // no se encontró el id
          result(
            {
              kind: "Ocurrió un error al obtener los usuarios por edad.",
            },
            null
          );
          return;
        }
        result(null, res);
      }
    );
  };

  Reporte.findnews = (id, result) => {
    var query = `select u.id_user as 'id', u.name, u.lastname,c.nicename as 'nationality', count(n.id_new) as 'count' 
    from Usuario u
    join Noticia n on n.empleado=u.id_user
    join Country c on u.id_Country = c.id_Country
    where u.id_rol=2
    group by u.id_user, u.name, u.lastname, c.nicename
    Order BY  count `;
    if(id == 1){
      query += 'ASC'
    }else{
      query += 'DESC'
    }

    conexion.query(
      query,
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // no se encontró el id
          result(
            {
              kind: "Ocurrió un error al obtener los usuarios con mas/menos noticias.",
            },
            null
          );
          return;
        }
        result(null, res);
      }
    );
  };

  module.exports = Reporte;