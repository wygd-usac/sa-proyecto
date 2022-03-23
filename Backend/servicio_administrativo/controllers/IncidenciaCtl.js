const IncidenciaCtl = require("../models/IncidenciaModel");
const Transferencia = require("../models/Transefer_LogModel");

async function InsertTransefernces(req, res, next){
    try {
        const descripcion = req.body.descripcion;
        const minuto = req.body.minuto;
        const id_person = req.body.id_person;
        const id_team = req.body.id_team;
        const id_partido = req.body.id_partido;
        let resultado = await IncidenciaCtl.insertIncidencia(descripcion, minuto, id_person, id_team, id_partido);
        if(resultado){
            res.status(200).json({msg:"registrado correctamente"});
        }else{
            res.status(400).json({msg:"error en el registro"});
        }
    }catch(error){
        res.status(400).json({msg:"error en el registro"});
    }
}

async function UpdateStatePerson(req, res, next){
    try {
        const id_person = req.body.id_person;
        const state = req.body.state;
        let resultado = await IncidenciaCtl.updateStateJugador(id_person, state);
        if(resultado){
            res.status(200).json({msg:"actualizado correctamente"});
        }else{
            res.status(400).json({msg:"error en la actualizacion"});
        }
    }catch(error){
        res.status(400).json({msg:"error la actualizacion"});
    }
}

async function InsertNew(req, res, next){
    try {
        const id_team = req.body.id_team;
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        let empleado = req.body.empleado;
        if(empleado === undefined){
            empleado = null;
        }
        let resultado = await IncidenciaCtl.insertNew(id_team, title, description, date, empleado)
        if(resultado){
            res.status(200).json({msg:"inserccion correctamente"});
        }else{
            res.status(400).json({msg:"error en la inserccion"});
        }
    }catch(error){
        res.status(400).json({msg:"error la inserccion"});
    }
}

async function getNoticias(req, res, next){
    try {
        let team = req.body.team;
        if(team === undefined){
            team = null;
        }
        let resultado = await IncidenciaCtl.getNoticias(team);
        if(resultado){
            res.status(200).json(resultado);
        }else{
            res.status(400).json({msg:"error al obtener registros"})
        }
    }catch(error){
        res.status(400).json({msg:"error al obtener registros"})
    }
}

module.exports.InsertTransefernces = InsertTransefernces;
module.exports.UpdateStatePerson = UpdateStatePerson;
module.exports.InsertNew = InsertNew;
module.exports.getNoticias = getNoticias;
