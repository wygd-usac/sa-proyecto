const conexion = require("./db");

const Bitacora = function (bitacora) {
  this.id_administrador = bitacora.id_administrador;
  this.accion = bitacora.accion;
  //this.fecha = bitacora.fecha;
  this.is_error = bitacora.is_error;
};

Bitacora.getAll = (id, result) => {
  let query = `select  u.id_user, u.name, u.lastname, B.accion,
                    date_format(CONVERT_TZ(B.fecha,'+00:00','-06:00'),'%d/%m/%Y %T') as date,
                    IF(B.is_error = 1, 'true', 'false') as is_error
                from Usuario u
                join Bitacora B on u.id_user = B.id_administrador`;

  if (id == "") {
    conexion.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Bitacora: ", res);
      result(null, res);
    });
  } else {
    query += ` WHERE id_administrador = ${id}`;
    conexion.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Bitacora: ", res);
      result(null, res);
    });
  }
};

Bitacora.create = (newBitacora, result) => {
  //let query = `select id_team, name from Equipo`;
  conexion.query("INSERT INTO Bitacora SET ?", newBitacora, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("se creo un log: ", { newBitacora });
    result(null, { Bitacora: newBitacora });
  });
};

Bitacora.getId = (result) => {
  let query = `select  u.id_user as id, u.name as user_name, u.lastname as user_lastname, B.accion as action,
  date_format(CONVERT_TZ(B.fecha,'+00:00','-06:00'),'%d/%m/%Y %T') as date, u.photo as user_photo, u.id_rol as user_rol, 'bitacora admin' as 'description', 'Bitacora' as 'database_table'
  from Usuario u
  join Bitacora B on u.id_user = B.id_administrador`;

    conexion.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Bitacora: ", res);
      result(null, res);
    });
};

module.exports = Bitacora;
