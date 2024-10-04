const mongoose = require('mongoose'); // Asegúrate de tener mongoose importado
const { request } = require('express');
const express = require('express'); // Framework de servidor web
const dbconnect = require('./config'); // Conexión a la base de datos
const ModelUser = require('./userModel'); // Modelo de usuario para interactuar con la colección de usuarios en la base de datos
const app = express(); // Crea una instancia de la aplicación Express

const router = express.Router(); // Crea un enrutador para manejar las rutas CRUD

// Middleware para ignorar solicitudes a /favicon.ico (esto evita devolver errores 404 por solicitudes de favicon)
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Ruta POST para crear un nuevo usuario en la base de datos
router.post("/", async (req, res) => {
    try {
        const body = req.body; // Obtiene el cuerpo de la solicitud
        const respuesta = await ModelUser.create(body); // Crea un nuevo usuario en la base de datos
        console.log("Usuario creado:", respuesta); // Imprime en consola los datos del usuario creado
        res.status(201).send(respuesta); // Envía la respuesta con los detalles del usuario creado
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).send({ error: "Error al crear el usuario" });
    }
});

// Ruta GET para obtener todos los usuarios en la base de datos
router.get("/", async (req, res) => {
    try {
        const respuesta = await ModelUser.find({}); // Busca y obtiene todos los usuarios
        res.send(respuesta); // Envía la lista de usuarios como respuesta
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send({ error: "Error al obtener los usuarios" });
    }
});

// Ruta GET para obtener un usuario por su ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id; // Obtiene el ID del usuario desde los parámetros de la URL

        // Verifica que el ID tenga un formato válido de MongoDB
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ error: "ID no válido" });
        }

        const respuesta = await ModelUser.findById(id); // Busca un usuario específico por su ID
        if (!respuesta) {
            return res.status(404).send({ error: "Usuario no encontrado" });
        }
        res.send(respuesta); // Envía los datos del usuario como respuesta
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send({ error: "Error al obtener el usuario" });
    }
});

// Ruta PUT para actualizar un usuario por su ID
// Ruta PUT para actualizar un usuario por su ID
// Ruta PUT para actualizar un usuario por su ID
router.put("/:id", async (req, res) => {
    try {
        const body = req.body; // Obtiene los datos actualizados del cuerpo de la solicitud
        const id = req.params.id; // Obtiene el ID del usuario desde los parámetros de la URL

        // Verifica que el ID tenga un formato válido de MongoDB
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ error: "ID no válido" });
        }

        // Verifica que el usuario exista antes de intentar actualizarlo
        const usuarioExistente = await ModelUser.findById(id);
        if (!usuarioExistente) {
            return res.status(404).send({ error: "Usuario no encontrado" });
        }

        // Verifica si el correo electrónico está cambiando y si existe en otro usuario
        if (body.email && body.email !== usuarioExistente.email) {
            const emailExistente = await ModelUser.findOne({ email: body.email });
            if (emailExistente) {
                return res.status(400).send({ error: "El correo electrónico ya está en uso" });
            }
        }

        // Actualiza el usuario con los nuevos datos
        const respuesta = await ModelUser.findOneAndUpdate({ _id: id }, body, { new: true });

        console.log("Usuario actualizado:", respuesta); // Imprime en consola los datos actualizados del usuario
        res.send(respuesta); // Envía la respuesta con los datos actualizados
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).send({ error: "Error al actualizar el usuario" });
    }
});


// Ruta DELETE para eliminar un usuario por su ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id; // Obtiene el ID del usuario desde los parámetros de la URL

        // Verifica que el ID tenga un formato válido de MongoDB
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ error: "ID no válido" });
        }

        const respuesta = await ModelUser.deleteOne({ _id: id }); // Elimina el usuario por su ID
        if (respuesta.deletedCount === 0) {
            return res.status(404).send({ error: "Usuario no encontrado" });
        }
        console.log("Usuario eliminado:", respuesta);
        res.send({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).send({ error: "Error al eliminar el usuario" });
    }
});

// Middleware para que la aplicación pueda manejar datos JSON en el cuerpo de las solicitudes
app.use(express.json());
app.use(router); // Utiliza el enrutador para manejar todas las rutas definidas anteriormente

// Inicia el servidor en el puerto 3001 y muestra un mensaje en la consola cuando esté en funcionamiento
app.listen(3001, () => {
    console.log("El servidor está en el puerto 3001");
});

// Conexión a la base de datos
dbconnect();
