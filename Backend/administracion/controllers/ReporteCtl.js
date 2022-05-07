const Reporte = require("../models/ReporteModel");

exports.memberships = (req, res) => {
  var id = req.query.id || "";

  Reporte.findmemberships(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener usuarios con mas membresías.",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Usuarios con mas membresías obtenidos con éxito.",
        data: data,
      });
  });
};

exports.suscribe = (req, res) => {
  var id_team = req.query.id_team || "";

  Reporte.suscribeByTeam(id_team, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener usuarios suscritos al equipo " +id_team,
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Usuarios suscritos al equipo x obtenidos con éxito.",
        data: data,
      });
  });
};

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

  exports.expenses = (req, res) => {
    var id = req.query.id || "";
  
    Reporte.findexpenses(id, (err, data) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: "Error al obtener el reporte",
          data: [],
        });
      else
        res.send({
          status: 200,
          message: "Información de reporte: Mas dinero gastado",
          data: data,
        });
    });
  };

  exports.country = (req, res) => {
    var id = req.query.id_country || "";
  
    Reporte.findcountry(id, (err, data) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: "Error al obtener el reporte",
          data: [],
        });
      else
        res.send({
          status: 200,
          message: "Información de reporte: Usuarios por pais",
          data: data,
        });
    });
  };

  exports.genre = (req, res) => {
    var id = req.query.gender || "";
  
    Reporte.findgenre(id, (err, data) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: "Error al obtener el reporte",
          data: [],
        });
      else
        res.send({
          status: 200,
          message: "Información de reporte: Usuarios por genero",
          data: data,
        });
    });
  };

  exports.age = (req, res) => {
    var id = req.query.age || "";
  
    Reporte.findage(id, (err, data) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: "Error al obtener el reporte",
          data: [],
        });
      else
        res.send({
          status: 200,
          message: "Información de reporte: Usuarios por edad",
          data: data,
        });
    });
  };

  exports.news = (req, res) => {
    var id = req.query.order || "";
  
    Reporte.findnews(id, (err, data) => {
      if (err)
        res.status(400).send({
          status: 400,
          message: "Error al obtener el reporte",
          data: [],
        });
      else
        res.send({
          status: 200,
          message: "Información de reporte: Empleados con mas/mens noticias.",
          data: data,
        });
    });
  };