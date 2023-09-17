import {Request,Response } from "express";
import db from '../database';

class AnioController{


//Métodos CRUD
//---Create
public async create(req:Request, res:Response){
    const {  nombre,factor_riesgo } = req.body;

    try {
        const queryText = "INSERT INTO anio ( nombre, factor_riesgo) VALUES ($1, $2)";
        const queryParams = [ nombre,factor_riesgo];
        const result = await db.query(queryText, queryParams);
        res.json({ text: "Año guardado" });
    } catch (error) {
        console.error("Error al crear año:", error);
        res.status(500).json({ error: "Ocurrió un error al crear el año" });
    }
}

//---Listar
public async list(req:Request,res:Response){
    try{ 
        const anios=await db.query("SELECT * FROM anio");
        res.json(anios);
    
}catch(error){
    console.error("Error al listar años:", error);
    res.status(500).json({ error: "Ocurrió un error al listar años" });
}
}
//---Obtener
public async getOne(req:Request, res:Response){
    const id=req.params.id;
    try{
        const query= await db.query("SELECT * FROM anio WHERE id_anio =$1",[id]);
        res.json(query);
    }catch(error){
        console.error("Error al listar el año:", error);
        res.status(500).json({ error: "Ocurrió un error al listar el año de id: "+ req.params.id  });

    }
}

//--Actualizar
public async update(req:Request, res:Response){
    const text="UPDATE anio SET  nombre=$1, factor_riesgo=$2 WHERE id_anio=$3";
    const {  nombre,  factor_riesgo} = req.body;
    const params=[nombre, factor_riesgo, req.params.id];
    try{
      const query=await db.query(text,params);
      res.json({text:"Año actualizado correctamente"});
    }catch(error){
        console.error("Error al actualizar año:", error);
        res.status(500).json({ error: "Ocurrió un error al actualizar el año de id: "+req.params.id  });
    }
}

//-Eliminar
public delete(req:Request, res:Response){
    try{
        db.query("DELETE FROM anio WHERE id_anio=$1",[req.params.id]);
        res.json({Text:`Eliminando año de la id ${req.params.id}`});

    }catch(error){
        res.status(500).json({error:"No fue posible eliminar el año de id "+req.params.id});
    }

    
}
}

 const anioController= new AnioController();
 export  default anioController;