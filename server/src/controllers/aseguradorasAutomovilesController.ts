import {Request,Response } from "express";
import db from '../database';

class AseguradorasAutomovilesController{


//Métodos CRUD
//---Create
public async create(req:Request, res:Response){
    const {  nombre, correo, telefono, descripcion, imagen } = req.body;

    try {
        const queryText = "INSERT INTO aseguradora_vehiculo ( nombre, correo, telefono, descripcion, imagen) VALUES ($1, $2, $3, $4, $5)";
        const queryParams = [ nombre, correo, telefono, descripcion, imagen];
        const result = await db.query(queryText, queryParams);
        res.json({ text: "Aseguradora de automóvil guardada" });
    } catch (error) {
        console.error("Error al crear aseguradora:", error);
        res.status(500).json({ error: "Ocurrió un error al crear la aseguradora de automóvil" });
    }
}

//---Listar
public async list(req:Request,res:Response){
    try{ 
        const aseguradoras=await db.query("SELECT * FROM aseguradora_vehiculo");
        res.json(aseguradoras);
    
}catch(error){
    console.error("Error al listar aseguradoras:", error);
    res.status(500).json({ error: "Ocurrió un error al listar las aseguradora de automóviles" });
}
}
//---Obtener
public async getOne(req:Request, res:Response){
    const id=req.params.id;
    try{
        const query= await db.query("SELECT * FROM aseguradora_vehiculo WHERE id_aseguradora_vehiculo =$1",[id]);
        res.json(query);
    }catch(error){
        console.error("Error al listar la aseguradora:", error);
        res.status(500).json({ error: "Ocurrió un error al listar la aseguradora de automóvil de id: "+req.params.id  });

    }
}

//--Actualizar
public async update(req:Request, res:Response){
    const text="UPDATE aseguradora_vehiculo SET  nombre=$1, correo=$2, telefono=$3, descripcion=$4, imagen=$5 WHERE id_aseguradora_vehiculo=$6";
    const { nombre, correo, telefono, descripcion, imagen } = req.body;
    const params=[ nombre, correo, telefono, descripcion, imagen,req.params.id];
    try{
      const query=await db.query(text,params);
      res.json({text:"Aseguradora actualizada correctamente"});
    }catch(error){
        console.error("Error al actualizar la aseguradora:", error);
        res.status(500).json({ error: "Ocurrió un error al actualizar la aseguradora de automóvil de id: "+req.params.id  });
    }
}

//-Eliminar
public delete(req:Request, res:Response){
    try{
        db.query("DELETE FROM aseguradora_vehiculo WHERE id_aseguradora_vehiculo=$1",[req.params.id]);
        res.json({Text:`Eliminando aseguradora de la id ${req.params.id}`});

    }catch(error){
        res.status(500).json({error:"No fue posible eliminar la aseguradora de id "+req.params.id});
    }

    
}
}

 const aseguradorasAutomovilesController= new AseguradorasAutomovilesController();
 export  default aseguradorasAutomovilesController;