const {request}=require('express')
const express= require('express');
const dbconnect = require('./config');
const ModelUser = require('./userModel');
const app=express();

const router=express.Router();

// Middleware para ignorar solicitudes a /favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204).end());


//rutas crud create,read,update,delete
router.post("/",async(req,res)=>{
    const body=req.body;
    const respuesta=await ModelUser.create(body)
    console.log("Usuario creado:", respuesta); // Verifica lo que se está creando
    res.send(respuesta)
})


//el buscar todos
router.get("/",async(req,res)=>{
    const respuesta=await ModelUser.find({})
    res.send(respuesta);
})

//EL BUSCAR POR ID
router.get("/:id",async(req,res)=>{
    const id=req.params.id;
    const respuesta=await ModelUser.findById(id)
    res.send(respuesta);
})

//modificar
router.put("/:id",async(req,res)=>{
    const body=req.body;
    const id=req.params.id;
    const respuesta=await ModelUser.findOneAndUpdate({_id:id},body)
    res.send(respuesta);
})
//eliminar
router.delete("/:id",async(req,res)=>{
    const id=req.params.id;
    const respuesta=await ModelUser.deleteOne({_id:id})
    res.send(respuesta);
})





app.use(express.json())
app.use(router)




app.listen(3001,()=>{
    console.log("El servidor esta en el puerto 3001");
    
})

dbconnect();