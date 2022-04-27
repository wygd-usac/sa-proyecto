const Reporte = require("../models/ReporteModel");

exports.suscribe = (req, res) => {
  var id = req.query.id || "";

  Reporte.suscribeByTeam(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener usuarios suscritos al equipo ",
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

exports.membership = (req, res) => {
  var id = req.query.id || "";

  Reporte.findmembership(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener usuarios con o sin membresía.",
        data: [],
      });
    else
      res.send({
        status: 200,
        message:
          "Información de reporte: Usuarios con o sin membresía obtenidos con éxito.",
        data: data,
      });
  });
};

exports.memberships = (req, res) => {
  var id = req.query.id || "";

  Reporte.findmemberships(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener el reporte",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Información de reporte: Top cantidad de membresias",
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
  var id = req.query.id || "";

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
  var id = req.query.genero || "";

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
  var id = req.query.edad || "";

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
  var id = req.query.edad || "";

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

exports.newsByTeam = (req, res) => {
  var id = req.query.equipo || "";

  Reporte.findnewsByTeam(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener el reporte",
        data: [],
      });
    else
      res.send({
        status: 200,
        message:
          "Información de reporte: Empleados con mas/mens noticias por equipo.",
        data: data,
      });
  });
};
