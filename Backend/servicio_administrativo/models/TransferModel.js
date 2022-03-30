const conexion = require("./db");

const Transfer = function(transfer){
    this.first_date = transfer.first_date;
    this.Last_date = transfer.Last_date;
    this.Person_id = transfer.Person_id;
    this.team_origin = transfer.team_origin;
    this.team_destination = transfer.team_destination;
    this.id_user = transfer.id_user;
};

Transfer.create = (newTransfer, result) => {
    conexion.query("INSERT INTO Transferencias SET ?", newTransfer, (err,res) => {
        if(err){
            console.log("error:", err);
            result(err,null);
            return;
        }
        console.log("se actualizo la transferencia: ", {id: res.insertId, ...newTransfer});
        result(null, {id: res.insertId, ...newTransfer});
    });
};

Transfer.getAll = (result) => {
    let query = "select first_date, Last_date, Person_id as id_Person, (Select name from Person where Person_id = id_person) as Person, team_origin as id_team_origin, (Select name from Equipo where team_origin = id_team) as team_origin, team_destination as id_team_destination, (Select name from Equipo where team_destination = id_team) as team_destination, id_user from Transferencias";
    
      conexion.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("Transferencias: ", res);
        result(null, res);
      });
};


module.exports = Transfer;