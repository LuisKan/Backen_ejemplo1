//definir un formato para el documento
const mongoose = require('mongoose'); // Import mongoose to define the schema

const RestauranteSchema = new mongoose.Schema({ // Define the schema for the Restaurante model
    nombre: {
        type: String,
        required: [true, "Nombre is required"]
    },
    direccion: {
        type: String,
        required: [true, "Direccion is required"]
    },
    tipo: {
        type: String,
        required: [true, "Tipo is required"]
    },
    imagen: {
        type: String,
        required: [true, "Imagen is required"]
    }
});

const Restaurante = mongoose.model('Restaurante', RestauranteSchema); // Define the model
module.exports = Restaurante;
