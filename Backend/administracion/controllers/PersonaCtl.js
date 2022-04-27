const Persona = require("../models/PersonaModel");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: 400,
      message:
        "Error al crear jugador o DT, los campos no pueden estar en blanco",
      data: [],
    });
  }

  const persona = new Persona({
    name: req.body.name,
    lastname: req.body.lastname,
    birthday: req.body.birthday,
    nationality: req.body.nationality,
    id_stand: req.body.id_stand,
    type: req.body.type,
    status: req.body.status,
    id_team: req.body.id_team,
    photo: req.body.photo,
  });
  //console.log(persona);
  Persona.create(persona, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al crear jugador o DT",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Jugador o DT creado con éxito",
        data: data,
      });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: 400,
      message: "Error al actualizar jugador o DT",
      data: [],
    });
  }

  console.log(req.body);

  Persona.updateById(req.body.id, new Persona(req.body), (err, data) => {
    if (err) {
      if (err.kind === "el id especificado no existe") {
        res.status(404).send({
          status: 400,
          message: "Error al actualizar jugador o DT",
          data: [],
        });
      } else {
        res.status(400).send({
          status: 400,
          message: "Error al actualizar jugador o DT",
          data: [],
        });
      }
    } else
      res.send({
        status: 200,
        message: "Jugador o DT actualizado con éxito",
        data: data,
      });
  });
};

exports.updateUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: 400,
      message: "Error al actualizar jugador o DT",
      data: [],
    });
  }

  console.log(req.body);

  Persona.updateStatus(req.body.id, new Persona(req.body), (err, data) => {
    if (err) {
      if (err.kind === "el id especificado no existe") {
        res.status(404).send({
          status: 400,
          message: "Error al actualizar jugador o DT",
          data: [],
        });
      } else {
        res.status(400).send({
          status: 400,
          message: "Error al actualizar jugador o DT",
          data: [],
        });
      }
    } else
      res.send({
        status: 200,
        message: "Jugador o DT actualizado con éxito",
        data: data,
      });
  });
};

exports.delete = (req, res) => {
  const id = req.query.id;
  console.log("id ", id);
  Persona.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "Jugador o DT no encontrado") {
        res.status(404).send({
          status: 400,
          message: "Error al eliminar el jugador o DT",
          data: [],
        });
      } else {
        res.status(400).send({
          status: 400,
          message: "Error al eliminar el jugador o DT",
          data: [],
        });
      }
    } else
      res.send({
        status: 200,
        message: "Jugador o DT eliminado con éxito",
        data: [data],
      });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.query.id;
  console.log("id ", id);
  Persona.removeUser(id, (err, data) => {
    if (err) {
      if (err.kind === "Usuario no encontrado") {
        res.status(404).send({
          status: 400,
          message: "Error al eliminar el Usuario",
          data: [],
        });
      } else {
        res.status(400).send({
          status: 400,
          message: "Error al eliminar el Usuario",
          data: [],
        });
      }
    } else
      res.send({
        status: 200,
        message: "Usuario o DT eliminado con éxito",
        data: [data],
      });
  });
};

exports.findAll = (req, res) => {
  var id = req.query.id || "";

  Persona.getAll(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener jugador o DT",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Información de jugador o DT",
        data: data,
      });
  });
};

exports.getStands = (req, res) => {
  var id = req.query.id || "";

  Persona.getStands(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener Stands",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Información de Stands",
        data: data,
      });
  });
};

exports.getCountrys = (req, res) => {
  var id = req.query.id || "";

  Persona.getCountrys(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener Countrys",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Información de Countrys",
        data: data,
      });
  });
};

exports.getTeams = (req, res) => {
  var id = req.query.id || "";

  Persona.getTeams(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener Teams",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Información de Teams",
        data: data,
      });
  });
};

exports.getUsers = (req, res) => {
  var id = req.query.id || "";

  Persona.getUsers(id, (err, data) => {
    if (err)
      res.status(400).send({
        status: 400,
        message: "Error al obtener Users",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Información de Users",
        data: data,
      });
  });
};
