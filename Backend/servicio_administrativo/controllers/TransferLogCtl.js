const Transferencia = require("../models/Transefer_LogModel");

async function getTransefernces(req, res, next){
    try {
        let resultado = await Transferencia.getTransferencias();
        if(resultado){
            res.status(200).json(resultado);
        }else{
            res.status(400).json({msg:"error al obtener registros"})
        }
    }catch(error){
        res.status(400).json({msg:"error al obtener registros"})
    }
}

module.exports.getTransefernces = getTransefernces;
