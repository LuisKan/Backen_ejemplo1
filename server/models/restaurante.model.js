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
    },
    puntuacion: {
        type: Number,
        min: [0, "La puntuación no puede ser menor a 0"],
        max: [5, "La puntuación no puede ser mayor a 5"],
        default: 0
    }
});

const Restaurante = mongoose.model('Restaurante', RestauranteSchema); // Define the model
module.exports = Restaurante;
