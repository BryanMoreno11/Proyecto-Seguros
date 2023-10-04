import {Request,Response } from "express";
import db from '../database';

class SeguroVehiculoController{


//Métodos CRUD
//---Create
public async create(req:Request, res:Response){
    const {  id_aseguradora_vehiculo,id_vehiculo,descuento,precio } = req.body;

    try {
        const queryText = "INSERT INTO seguro_vehiculo (  id_aseguradora_vehiculo,id_vehiculo,descuento,precio ) VALUES ($1, $2, $3, $4)";
        const queryParams = [ id_aseguradora_vehiculo,id_vehiculo,descuento,precio ];
        const result = await db.query(queryText, queryParams);
        res.json({ text: "Seguro de vehículo guardado" });
    } catch (error) {
        console.error("Error al crear seguro:", error);
        res.status(500).json({ error: "Ocurrió un error al crear el seguro de automóvil" });
    }
}

//---Listar
public async list(req:Request,res:Response){
    try{ 
        const seguros=await db.query("SELECT * FROM vista_seguro_vehiculo order By id_seguro_vehiculo asc");
        res.json(seguros);
    
}catch(error){
    console.error("Error al listar seguros de automóvil:", error);
    res.status(500).json({ error: "Ocurrió un error al listar los seguros de automóviles" });
}
}
//---Obtener
public async getOne(req:Request, res:Response){
    const id=req.params.id;
    try{
        const query= await db.query("SELECT * FROM seguro_vehiculo WHERE id_seguro_vehiculo =$1",[id]);
        res.json(query);
    }catch(error){
        console.error("Error al listar seguro de automóvil", error);
        res.status(500).json({ error: "Ocurrió un error al listar el seguro de automóvil de id: "+req.params.id  });

    }
}

//--Actualizar
public async update(req:Request, res:Response){
    const text="UPDATE seguro_vehiculo SET id_aseguradora_vehiculo=$1, id_vehiculo=$2, descuento=$3, precio=$4 WHERE id_seguro_vehiculo=$5";
    const {  id_aseguradora_vehiculo,id_vehiculo,descuento,precio  } = req.body;
    const params=[id_aseguradora_vehiculo,id_vehiculo,descuento,precio,req.params.id];
    try{
      const query=await db.query(text,params);
      res.json({text:"seguro de automóvil actualizado correctamente"});
    }catch(error){
        console.error("Error al actualizar el seguro de automóvil:", error);
        res.status(500).json({ error: "Ocurrió un error al actualizar el seguro de automóvil de id: "+req.params.id  });
    }
}

//-Eliminar
public delete(req:Request, res:Response){
    try{
        db.query("DELETE FROM seguro_vehiculo WHERE id_seguro_vehiculo=$1",[req.params.id]);
        res.json({Text:`Eliminado el seguro de vehículo de la id ${req.params.id}`});

    }catch(error){
        res.status(500).json({error:"No fue posible eliminar el seguro de vehículo de id "+req.params.id});
    }

    
}
}

 const seguroVehiculoController= new SeguroVehiculoController();
 export  default seguroVehiculoController;