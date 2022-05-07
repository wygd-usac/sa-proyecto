const Reporte = require("../models/ReporteModel");

exports.newsByTeam = (req, res) => {
    var id = req.query.id_team ;
    var order= req.query.order;
  
    Reporte.findnewsByTeam(id,order, (err, data) => {
      if (err)
        res.status(400).send({
          status: 400,
          msg: "Error al obtener empleados con mas o menos noticias publicadas de x equipo.",
          data: [],
        });
      else
        res.send({
          status: 200,
          msg:
            "Empleados con mas o menos noticias publicadas de x equipo, obtenidos con éxito.",
          data: data,
        });
    });
  };