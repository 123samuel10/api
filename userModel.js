const mongoose = require('mongoose');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Si el nombre es requerido
    },
    email: {
        type: String,
        required: true, // Si el email es requerido
        unique: true // Para asegurarse de que los correos sean únicos
    },
    password: {
        type: String,
        required: true // Si la contraseña es requerida
    }
}, {
    timestamps: true, // Para añadir createdAt y updatedAt automáticamente
    versionKey: false  // Para evitar el campo __v
});

// Crear el modelo a partir del esquema
const ModelUser = mongoose.model("users", userSchema);

module.exports = ModelUser;
