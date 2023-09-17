import {Request,Response } from "express";
import db from '../database';

class ClienteVidaController{


//Métodos CRUD
//---Create
public async create(req:Request, res:Response){
    const {id_cliente ,id_plan_vida } = req.body;

    try {
        const queryText = "INSERT INTO cliente_vida ( id_cliente ,id_plan_vida ) VALUES ($1, $2)";
        const queryParams = [ id_cliente ,id_plan_vida ];
        const result = await db.query(queryText, queryParams);
        res.json({ text: "Cliente_Vida guardado" });
    } catch (error) {
        console.error("Error al crear Cliente_Vida:", error);
        res.status(500).json({ error: "Ocurrió un error al crear Cliente_Vida" });
    }
}

//---Listar
public async list(req:Request,res:Response){
    try{ 
        const clientevida=await db.query("SELECT * FROM cliente_vida");
        res.json(clientevida);
    
}catch(error){
    console.error("Error al listar Cliente_vida:", error);
    res.status(500).json({ error: "Ocurrió un error al listar Cliente_vida" });
}
}
//---Obtener
public async getOne(req:Request, res:Response){
    const id=req.params.id;
    try{
        const query= await db.query("SELECT * FROM cliente_vida WHERE id_cliente_vida =$1",[id]);
        res.json(query);
    }catch(error){
        console.error("Error al listar Cliente_vida", error);
        res.status(500).json({ error: "Ocurrió un error al listar Cliente_vida de id: "+req.params.id  });

    }
}

//--Actualizar
public async update(req:Request, res:Response){
    const text="UPDATE cliente_vida SET  id_cliente=$1, id_plan_vida=$2 WHERE id_cliente_vida=$3";
    const {  id_cliente ,id_plan_vida  } = req.body;
    const params=[id_cliente ,id_plan_vida ,req.params.id];
    try{
      const query=await db.query(text,params);
      res.json({text:"Cliente_vida actualizado correctamente"});
    }catch(error){
        console.error("Error al actualizar Cliente_vida:", error);
        res.status(500).json({ error: "Ocurrió un error al actualizar Cliente_vida de id: "+req.params.id  });
    }
}

//-Eliminar
public delete(req:Request, res:Response){
    try{
        db.query("DELETE FROM cliente_vida WHERE id_cliente_vida=$1",[req.params.id]);
        res.json({Text:`Eliminado Cliente_vida de la id ${req.params.id}`});

    }catch(error){
        res.status(500).json({error:"No fue posible eliminar Cliente_vida de id "+req.params.id});
    }

    
}
}

 const clienteVidaController= new ClienteVidaController();
 export  default clienteVidaController;