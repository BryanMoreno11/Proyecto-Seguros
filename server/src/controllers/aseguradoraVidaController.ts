import {Request,Response } from "express";
import db from '../database';

class AseguradoraVidaController{


//Métodos CRUD
//---Create
public async create(req:Request, res:Response){
    const {  nombre, correo, telefono, descripcion,imagen } = req.body;

    try {
        const queryText = "INSERT INTO aseguradora_vida ( nombre, correo, telefono, descripcion,imagen) VALUES ($1, $2, $3, $4, $5)";
        const queryParams = [ nombre, correo, telefono, descripcion,imagen];
        const result = await db.query(queryText, queryParams);
        res.json({ text: "Aseguradora de vida guardado" });
    } catch (error) {
        console.error("Error al crear aseguradora de vida:", error);
        res.status(500).json({ error: "Ocurrió un error al crear aseguradora de vida" });
    }
}

//---Listar
public async list(req:Request,res:Response){
    try{ 
        const aseguradoras=await db.query("SELECT * FROM aseguradora_vida");
        res.json(aseguradoras);
    
}catch(error){
    console.error("Error al listar aseguradoras de vida:", error);
    res.status(500).json({ error: "Ocurrió un error al listar las aseguradoras de vida" });
}
}
//---Obtener
public async getOne(req:Request, res:Response){
    const id=req.params.id;
    try{
        const query= await db.query("SELECT * FROM aseguradora_vida WHERE id_aseguradora_vida =$1",[id]);
        res.json(query);
    }catch(error){
        console.error("Error al listar las aseguradoras de vida:", error);
        res.status(500).json({ error: "Ocurrió un error al listar la aseguradora de vida de id: "+ req.params.id  });

    }
}

//--Actualizar
public async update(req:Request, res:Response){
    const text="UPDATE aseguradora_vida SET  nombre=$1, correo=$2, telefono=$3, descripcion=$4,imagen=$5 WHERE id_aseguradora_vida=$6";
    const { nombre, correo, telefono, descripcion,imagen} = req.body;
    const params=[ nombre, correo, telefono, descripcion,imagen, req.params.id];
    try{
      const query=await db.query(text,params);
      res.json({text:"Aseguradora de vida actualizada correctamente"});
    }catch(error){
        console.error("Error al actualizar aseguradora de vida:", error);
        res.status(500).json({ error: "Ocurrió un error al actualizar la aseguradora de vida de id: "+req.params.id  });
    }
}

//-Eliminar
public delete(req:Request, res:Response){
    try{
        db.query("DELETE FROM aseguradora_vida WHERE id_aseguradora_vida=$1",[req.params.id]);
        res.json({Text:`Eliminando aseguradora de vida del id ${req.params.id}`});

    }catch(error){
        res.status(500).json({error:"No fue posible eliminar la aseguradora de vida de id "+req.params.id});
    }

    
}
}

 const aseguradoraVidaController = new AseguradoraVidaController();
 export  default aseguradoraVidaController;