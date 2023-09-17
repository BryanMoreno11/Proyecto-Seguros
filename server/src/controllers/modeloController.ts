import {Request,Response } from "express";
import db from "../database";

class ModeloController{
    public async create(req:Request, res:Response){
        const {  nombre, marca, factor_riesgo } = req.body;
    
        try {
            const queryText = "INSERT INTO modelo ( nombre, marca, factor_riesgo) VALUES ($1, $2, $3)";
            const queryParams = [ nombre, marca, factor_riesgo];
            const result = await db.query(queryText, queryParams);
            res.json({ text: "Modelo guardado" });
        } catch (error) {
            console.error("Error al crear modelo:", error);
            res.status(500).json({ error: "Ocurrió un error al crear el modelo" });
        }
    }

    //---Listar
    public async list(req:Request,res:Response){
        try{ 
            const modelo=await db.query("SELECT * FROM modelo");
            res.json(modelo);
        
    }catch(error){
        console.error("Error al listar modelos:", error);
        res.status(500).json({ error: "Ocurrió un error los modelos" });
    }
    }

    //---Obtener
public async getOne(req:Request, res:Response){
    const id=req.params.id;
    try{
        const query= await db.query("SELECT * FROM modelo WHERE id_modelo =$1",[id]);
        res.json(query);
    }catch(error){
        console.error("Error al listar el modelo:", error);
        res.status(500).json({ error: "Ocurrió un error al listar el modelo de id: "+req.params.id  });

    }
}

//--Actualizar
public async update(req:Request, res:Response){
    const text="UPDATE modelo SET  nombre=$1, marca=$2, factor_riesgo=$3 WHERE id_modelo=$4";
    const { nombre, marca, factor_riesgo} = req.body;
    const params=[ nombre, marca, factor_riesgo,req.params.id];
    try{
      const query=await db.query(text,params);
      res.json({text:"Modelo actualizado correctamente"});
    }catch(error){
        console.error("Error al actualizar el modelo:", error);
        res.status(500).json({ error: "Ocurrió un error al actualizar el modelo de id: "+req.params.id  });
    }
}

public delete(req:Request, res:Response){
    try{
        db.query("DELETE FROM modelo WHERE id_modelo=$1",[req.params.id]);
        res.json({Text:`Eliminando el modelo de la id ${req.params.id}`});

    }catch(error){
        res.status(500).json({error:"No fue posible eliminar el modelo de id "+req.params.id});
    }
}
}

const modeloController= new ModeloController();
export default modeloController;
