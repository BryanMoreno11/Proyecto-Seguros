import {Request,Response } from "express";
import db from "../database";

class ClienteController{
    public async create(req:Request, res:Response){
        const {  cedula, nombre, apellido, fecha_nacimiento,provincia,ciudad,telefono,correo } = req.body;
    
        try {
            const queryText = "INSERT INTO cliente ( cedula, nombre, apellido, fecha_nacimiento,provincia,ciudad,telefono,correo ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
            const queryParams = [ cedula, nombre, apellido, fecha_nacimiento,provincia,ciudad,telefono,correo ];
            const result = await db.query(queryText, queryParams);
            res.json({ text: "Cliente guardado" });
        } catch (error) {
            console.error("Error al crear cliente:", error);
            res.status(500).json({ error: "Ocurrió un error al crear el cliente" });
        }
    }

    //---Listar
    public async list(req:Request,res:Response){
        try{ 
            const cliente=await db.query("SELECT * FROM cliente");
            res.json(cliente);
        
    }catch(error){
        console.error("Error al listar clientes:", error);
        res.status(500).json({ error: "Ocurrió un error con los clientes" });
    }
    }

    //---Obtener
public async getOne(req:Request, res:Response){
    const id=req.params.id;
    try{
        const query= await db.query("SELECT * FROM cliente WHERE id_cliente =$1",[id]);
        res.json(query);
    }catch(error){
        console.error("Error al listar el cliente:", error);
        res.status(500).json({ error: "Ocurrió un error al listar el cliente de id: "+req.params.id  });

    }
}

//--Actualizar
public async update(req:Request, res:Response){
    const text="UPDATE cliente SET cedula=$1, nombre=$2, apellido=$3, fecha_nacimiento=$4, provincia=$5, ciudad=$6, telefono=$7, correo=$8 WHERE id_cliente=$9";
    const { cedula, nombre, apellido, fecha_nacimiento,provincia,ciudad,telefono,correo } = req.body;
    const params=[ cedula, nombre, apellido, fecha_nacimiento,provincia,ciudad,telefono,correo ,req.params.id];
    try{
      const query=await db.query(text,params);
      res.json({text:"Cliente actualizado correctamente"});
    }catch(error){
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({ error: "Ocurrió un error al actualizar el cliente de id: "+req.params.id  });
    }
}

public delete(req:Request, res:Response){
    try{
        db.query("DELETE FROM cliente WHERE id_cliente=$1",[req.params.id]);
        res.json({Text:`Eliminando el cliente de la id ${req.params.id}`});

    }catch(error){
        res.status(500).json({error:"No fue posible eliminar el cliente de id "+req.params.id});
    }
}
}

const clienteController= new ClienteController();
export default clienteController;
