// const mongoose=require('mongoose');
// const dbconnect=()=>{
//     mongoose.set('strictQuery',true);
//     mongoose.connect("mongodb://127.0.0.1:27017/user_prueba",{},(err,res)=>{
//         if(!err){
//             console.log("Conexion correcta");
            
//         }else{
//             console.log("Error de Conexion");
            
//         }
//     })
// }

// module.exports=dbconnect;

// El problema con tu código es que mongoose.connect() ya no acepta un callback a partir de las versiones recientes de Mongoose, y por eso estás recibiendo el error.
const mongoose = require('mongoose');

const dbconnect = async () => {
  mongoose.set('strictQuery', true);  // Configura el modo strictQuery
  
  try {
    await mongoose.connect("mongodb://localhost:27017/user_prueba");
    console.log("Conexión correcta a MongoDB");
  } catch (err) {
    console.log("Error de conexión:", err);
  }
};

module.exports = dbconnect;
