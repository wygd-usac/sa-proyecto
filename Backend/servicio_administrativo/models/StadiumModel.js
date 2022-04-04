const conexion = require("./db");

const Stadium = function(stadium){
    this.name = stadium.name;
    this.fundation_date = stadium.fundation_date;
    this.capacity = stadium.capacity; 
    this.id_Country = stadium.id_country;
    this.address = stadium.address;
    this.state = stadium.state; 
    this.photo = stadium.photo;
};

Stadium.create = (newStadium, result) => {
    conexion.query("INSERT INTO Estadio SET ?", newStadium, (err,res) => {
        if(err){
            console.log("error:", err);
            result(err,null);
            return;
        }
        console.log("se creo un nuevo estadio: ", {id: res.insertId, ...newStadium});
        result(null, {id: res.insertId, ...newStadium});
    });
};

Stadium.updateById = (id, stadium, result) => {
    conexion.query(
      "UPDATE Estadio SET name = ?, fundation_date = ?, capacity = ?, id_Country = ?, address = ?, state = ?, photo = ? WHERE id_Estadio = ?",
      [stadium.name, stadium.fundation_date, stadium.capacity, stadium.id_Country, stadium.address, stadium.state, stadium.photo, id],
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
  
        console.log("se actualizo el estadio especificado: ", { id: id, ...stadium });
        result(null, { id: id, ...stadium });
      }
    );
};
  
Stadium.remove = (id, result) => {
    conexion.query("DELETE FROM Estadio WHERE id_Estadio = ?",id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "estadio no encontrado" }, null);
        return;
      }
      console.log("Se ha eliminado el estadio especificado: ", id);
      result(null, res);
    });
};

Stadium.getAll = (id, result) => {
  //let query = "SELECT * FROM Estadio";
  let query = ` SELECT id_Estadio,name, date_format(fundation_date,'%d/%m/%Y') as fundation_date,photo,capacity,state,address, id_Country, 
  (select country FROM Country where id_Country = id_Country limit 1) as country FROM Estadio`;

  if(id == ''){
    conexion.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Equipos: ", res);
      result(null, res);
    });
  }else{
    query += ` WHERE id_Estadio = ${id}`;
    conexion.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Equipos: ", res);
      result(null, res);
    });
  }

  
};


module.exports = Stadium;