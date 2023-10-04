import {Request,Response } from "express";
import db from "../database";

class ClienteVehiculoController{
    public async create(req:Request, res:Response){
        const { id_cliente, id_seguro_vehiculo } = req.body;
    
        try {
            const queryText = "INSERT INTO cliente_vehiculo ( id_cliente, id_seguro_vehiculo) VALUES ($1, $2) RETURNING *";
            const queryParams = [ id_cliente, id_seguro_vehiculo ];
            const result = await db.query(queryText, queryParams);
            res.json(result);
        } catch (error) {
            console.error("Error al crear clientevehiculo:", error);
            res.status(500).json({ error: "Ocurrió un error al crear el clientevehiculo" });
        }
    }

    //---Listar
    public async list(req:Request,res:Response){
        try{ 
            const clientevehiculo=await db.query("SELECT * FROM vista_cliente_vehiculo");
            res.json(clientevehiculo);
        
    }catch(error){
        console.error("Error al listar clientesvehiculo:", error);
        res.status(500).json({ error: "Ocurrió un error con los clientesvehiculo" });
    }
    }

    //---Obtener
public async getOne(req:Request, res:Response){
    const id=req.params.id;
    try{
        const query= await db.query("SELECT * FROM vista_cliente_vehiculo WHERE id_cliente_vehiculo =$1",[id]);
        res.json(query);
    }catch(error){
        console.error("Error al listar el clientevehiculo:", error);
        res.status(500).json({ error: "Ocurrió un error al listar el clientevehiculo de id: "+req.params.id  });

    }
}

//--Actualizar
public async update(req:Request, res:Response){
    const text="UPDATE cliente_vehiculo SET  id_cliente=$1, id_seguro_vehiculo=$2 WHERE id_cliente_vehiculo=$3";
    const { id_cliente, id_seguro_vehiculo } = req.body;
    const params=[id_cliente, id_seguro_vehiculo ,req.params.id];
    try{
      const query=await db.query(text,params);
      res.json({text:"Clientevehiculo actualizado correctamente"});
    }catch(error){
        console.error("Error al actualizar el clientevehiculo:", error);
        res.status(500).json({ error: "Ocurrió un error al actualizar el clientevehiculo de id: "+req.params.id  });
    }
}

public delete(req:Request, res:Response){
    try{
        db.query("DELETE FROM cliente_vehiculo WHERE id_cliente_vehiculo=$1",[req.params.id]);
        res.json({Text:`Eliminando el clientevehiculo de la id ${req.params.id}`});

    }catch(error){
        res.status(500).json({error:"No fue posible eliminar el clientevehiculo de id "+req.params.id});
    }
}
}

const clienteVehiculoController= new ClienteVehiculoController();
export default clienteVehiculoController;
