import {Request,Response } from "express";
import db from '../database';

class VehiculoController{


//Métodos CRUD
//---Create
public async create(req:Request, res:Response){
    const {  id_modelo, id_anio, valor_mercado, valor_cotizacion } = req.body;

    try {
        const queryText = "INSERT INTO vehiculo (  id_modelo, id_anio,valor_mercado, valor_cotizacion ) VALUES ($1, $2, $3, $4)";
        const queryParams = [   id_modelo, id_anio, valor_mercado, valor_cotizacion];
        const result = await db.query(queryText, queryParams);
        res.json({ text: "vehículo guardado" });
    } catch (error) {
        console.error("Error al crear vehículo:", error);
        res.status(500).json({ error: "Ocurrió un error al crear vehículo" });
    }
}

//---Listar
public async list(req:Request,res:Response){
    try{ 
        const vehiculos=await db.query("SELECT * FROM vista_vehiculo order by id_vehiculo asc");
        res.json(vehiculos);
    
}catch(error){
    console.error("Error al listar vehículos:", error);
    res.status(500).json({ error: "Ocurrió un error al listar los vehículos" });
}
}
//---Obtener
public async getOne(req:Request, res:Response){
    const id=req.params.id;
    try{
        const query= await db.query("SELECT * FROM vehiculo WHERE id_vehiculo =$1",[id]);
        res.json(query);
    }catch(error){
        console.error("Error al listar vehículo", error);
        res.status(500).json({ error: "Ocurrió un error al listar el vehículo de id: "+req.params.id  });

    }
}

//--Actualizar
public async update(req:Request, res:Response){
    const text="UPDATE vehiculo SET  id_modelo=$1, id_anio=$2, valor_mercado=$3, valor_cotizacion=$4 WHERE id_vehiculo=$5";
    const {  id_modelo, id_anio, valor_mercado, valor_cotizacion } = req.body;
    const params=[ id_modelo, id_anio, valor_mercado, valor_cotizacion,req.params.id];
    try{
      const query=await db.query(text,params);
      res.json({text:"automóvil actualizado correctamente"});
    }catch(error){
        console.error("Error al actualizar el automóvil:", error);
        res.status(500).json({ error: "Ocurrió un error al actualizar el automóvil de id: "+req.params.id  });
    }
}

//-Eliminar
public delete(req:Request, res:Response){
    try{
        db.query("DELETE FROM vehiculo WHERE id_vehiculo=$1",[req.params.id]);
        res.json({Text:`Eliminado el vehículo de la id ${req.params.id}`});

    }catch(error){
        res.status(500).json({error:"No fue posible eliminar el vehículo de id "+req.params.id});
    }

    
}
}

 const vehiculoController= new VehiculoController();
 export  default vehiculoController;