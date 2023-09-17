import {Request,Response } from "express";
import db from '../database';

class PlanVidaController{
    //Métodos CRUD
    //---Create
    public async create(req:Request, res:Response){
        const {  id_aseguradora_vida, nombre, descripcion, precio } = req.body;
    
        try {
            const queryText = "INSERT INTO plan_vida ( id_aseguradora_vida, nombre,descripcion,precio) VALUES ($1, $2, $3, $4)";
            const queryParams = [ id_aseguradora_vida, nombre, descripcion, precio];
            const result = await db.query(queryText, queryParams);
            res.json({ text: "Plan de vida guardado" });
        } catch (error) {
            console.error("Error al crear plan de vida:", error);
            res.status(500).json({ error: "Ocurrió un error al crear el plan de vida" });
        }
    }

        //---Listar
    public async list(req:Request,res:Response){
        try{ 
            const plan_vida=await db.query("SELECT * FROM vista_plan_vida");
            res.json(plan_vida);
        
    }catch(error){
        console.error("Error al listar planes de vida:", error);
        res.status(500).json({ error: "Ocurrió un error al listar los planes de vida" });
    }
    }

        //---Obtener
    public async getOne(req:Request, res:Response){
        const id=req.params.id;
        try{
            const query= await db.query("SELECT * FROM plan_vida WHERE id_plan_vida =$1",[id]);
            res.json(query);
        }catch(error){
            console.error("Error al listar los planes de vida:", error);
            res.status(500).json({ error: "Ocurrió un error al listar el plan de vida de id: "+req.params.id  });
    
        }
    }

    //--Actualizar
    public async update(req:Request, res:Response){
        const text="UPDATE plan_vida SET  id_aseguradora_vida=$1, nombre=$2, descripcion=$3, precio=$4 WHERE id_plan_vida=$5";
        const {  id_aseguradora_vida, nombre, descripcion,precio } = req.body;
        const params=[ id_aseguradora_vida, nombre, descripcion, precio,req.params.id];
        try{
          const query=await db.query(text,params);
          res.json({text:"Plan de vida actualizado correctamente"});
        }catch(error){
            console.error("Error al actualizar el plan de vida:", error);
            res.status(500).json({ error: "Ocurrió un error al actualizar el plan de vida de id: "+req.params.id  });
        }
    }

    public delete(req:Request, res:Response){
        try{
            db.query("DELETE FROM plan_vida WHERE id_plan_vida=$1",[req.params.id]);
            res.json({Text:`Eliminando plan de vida del id ${req.params.id}`});
    
        }catch(error){
            res.status(500).json({error:"No fue posible eliminar el plan de vida de id "+req.params.id});
        }
    }

}
const planVidaController = new PlanVidaController();
export default planVidaController; 