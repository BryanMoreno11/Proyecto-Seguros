import {Request,Response } from "express";

class IndexController{

index(req:Request,res:Response){
    res.send("Hola");
    
}
}

export const indexController= new IndexController();