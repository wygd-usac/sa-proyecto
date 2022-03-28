const conexion = require("./db");

const Persona = function (persona) {
  this.name = persona.name;
  this.lastname = persona.lastname;
  this.birthday = persona.birthday;
  this.nationality = persona.nationality;
  this.id_stand = persona.id_stand;
  this.type = persona.type;
  this.status = persona.status;
  this.id_team = persona.id_team;
  this.photo = persona.photo;
};

Persona.create = (newPersona, result) => {
  conexion.query("INSERT INTO Person SET ?", newPersona, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("se creo un nuevo jugador o DT: ", {
      id: res.insertId,
      ...newPersona,
    });
    result(null, { id: res.insertId, ...newPersona });
  });
};

Persona.updateById = (id, persona, result) => {
  conexion.query(
    "UPDATE Person SET name = ?, lastname = ?, birthday = ?, status = ?, photo = ?, id_stand = ? , type = ? , id_team = ? , nationality = ? WHERE id_person = ?",
    [
      persona.name,
      persona.lastname,
      persona.birthday,
      persona.status,
      persona.photo,
      persona.id_stand,
      persona.type,
      persona.id_team,
      persona.nationality,
      id,
    ],
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

      console.log("se actualizo el jugador o DT: ", { id: id, ...persona });
      result(null, { id: id, ...persona });
    }
  );
};

Persona.updateStatus = (id, status, result) => {
  conexion.query(
    "UPDATE Person SET status = ? WHERE id_person = ?",
    status,
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // no se encontró el id
        result({ kind: "Error al actualizar el estado del usuario" }, null);
        return;
      }

      console.log("se actualizo el estado de jugador o DT: ", {
        id: id,
        ...persona,
      });
      result(null, { id: id, ...persona });
    }
  );
};

Persona.getAll = (id, result) => {
  let query = `select id_person, name, lastname, birthday, status, photo, id_stand,
                    (select po.stand from Posicion po where po.id_stand=p.id_stand) as stand ,
                    type, id_team,
                    (select e.name from Equipo e where e.id_team=p.id_team) as team,
                    nationality
                from Person p`;

  if (id == "") {
    conexion.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Jugadores o DT: ", res);
      result(null, res);
    });
  } else {
    query += ` WHERE id_person = ${id}`;
    conexion.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Jugadores o DT: ", res);
      result(null, res);
    });
  }
};

Persona.remove = (id, result) => {
  conexion.query("DELETE FROM Person WHERE id_person = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "jugador o DT no encontrado" }, null);
      return;
    }
    console.log("Se ha eliminado el jugador o DT especificado: ", id);
    result(null, res);
  });
};

module.exports = Persona;