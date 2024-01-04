import {Request,Response } from "express";
import db from '../database';

class ValoracionController{


//Métodos CRUD
//---Create
public async create(req:Request, res:Response){
    const {  id_cliente,valoracion } = req.body;

    try {
        const queryText = "INSERT INTO valoracion ( id_cliente, valoracion) VALUES ($1, $2)";
        const queryParams = [ id_cliente,valoracion];
        const result = await db.query(queryText, queryParams);
        res.json({ text: "Valoración guardada" });
    } catch (error) {
        console.error("Error al crear valoración:", error);
        res.status(500).json({ error: "Ocurrió un error al crear la valoración" });
    }
}

//---Listar
public async list(req:Request,res:Response){
    try{ 
        const valoraciones=await db.query("SELECT * FROM valoracion");
        res.json(valoraciones);
    
}catch(error){
    console.error("Error al listar valoraciones:", error);
    res.status(500).json({ error: "Ocurrió un error al listar valoraciones" });
}
}

}

 const valoracionController= new ValoracionController();
 export  default valoracionController;