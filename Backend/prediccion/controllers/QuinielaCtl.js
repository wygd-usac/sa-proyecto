const Quiniela = require("../models/QuinielaModel");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: 500,
      message: "Error al crear Quiniela, los campos no pueden estar en blanco",
      data: [],
    });
  }

  const quiniela = new Quiniela({
    team1_id: req.body.team1_id,
    team2_id: req.body.team2_id,
    goals_team2: req.body.goals_team2,
    goals_team1: req.body.goals_team1,
  });
  console.log(quiniela);
  Quiniela.create(quiniela, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        message: "Error al crear Quiniela",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Quiniela creado con éxito",
        data: data,
      });
  });
};
