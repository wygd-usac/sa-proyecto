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

Reporte.suscribeByTeam = (id, result) => {
  conexion.query(
    `select e.name as equipo, u.id_user, u.name, u.lastname,
        C.country as nationality,u.photo
    from Usuario u
    join Equipos_Seguidos es on u.id_user = es.id_usuario
    join Equipo e on es.id_team = e.id_team
    join Country C on C.id_Country = u.id_Country
    where e.id_team= ?`,
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // no se encontró el id
        result({ kind: "el id especificado no existe" }, null);
        return;
      }

      console.log("Suscritos a Equipo  ", { id: id });
      result(null, res);
    }
  );
};

Reporte.findmembership = (id, result) => {
  conexion.query(
    `select u.id_user, u.name, u.lastname,
        IF(u.membership > 0, 'true', 'false') as membership,
        C.country as nationality,u.photo
    from Usuario u
    join Country C on C.id_Country = u.id_Country
    order by name,lastname`,
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
            kind: "Ocurrió un error al obtener los usuarios con o sin membresia.",
          },
          null
        );
        return;
      }
      result(null, res);
    }
  );
};

Reporte.findmemberships = (id, result) => {
  conexion.query(
    `select id_user, name, lastname, membership from Usuario u
      where membership>0
      order by u.membership desc,name,lastname`,
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
            kind: "Ocurrió un error al obtener el top de membresias.",
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
    `select id_user, name, lastname, (membership*10) as membership from Usuario u
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
    `select u.id_user, u.name, u.lastname, c.country from Usuario u
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
    `select id_user, name, lastname,
          case when genre = 'M' then 'Masculino'
              when genre = 'F' then 'Femenino'
          end as genre
        from Usuario
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
    `select id_user,name,lastname,TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age
      from Usuario
      where TIMESTAMPDIFF(YEAR, birthday, CURDATE())=?`,
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
  conexion.query(
    `select u.id_user, u.name, u.lastname, count(n.id_new) as news from Usuario u
        join Noticia n on n.empleado=u.id_user
        where u.id_rol=2
        group by u.id_user, u.name, u.lastname`,
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

Reporte.findnewsByTeam = (id, result) => {
  conexion.query(
    `select u.id_user, u.name, u.lastname, count(n.id_new) as news, E.name as team from Usuario u
        join Noticia n on u.id_user = n.empleado
        join Equipo E on n.Equipo_id_team = E.id_team
      where where u.id_rol=2 and n.empleado=u.id_user and E.id_team = ?
      group by u.id_user, u.name, u.lastname, E.name`,
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
