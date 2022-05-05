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

Reporte.findnewsByTeam = (id, result) => {
    conexion.query(
      `select u.id_user as 'id', u.name, u.lastname, c.country as 'nationality', u.photo, count(n.id_new) as count  from Usuario u
      join Noticia n on u.id_user = n.empleado
      join Equipo E on n.Equipo_id_team = E.id_team
      join Country c on u.id_Country = c.id_Country
        where u.id_rol=2 and n.empleado=u.id_user and E.id_team = ?
        group by u.id_user, u.name, u.lastname,u.photo,c.country`,
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
  
  module.exports = Reporte;