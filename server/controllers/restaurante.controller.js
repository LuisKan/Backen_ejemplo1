const Restaurante = require('../models/restaurante.model'); // Importar el Restaurante model

// Crear un nuevo restaurante
module.exports.createRestaurante = (req, res) => {
    const { nombre, direccion, tipo, imagen } = req.body; // Desestructuración
    
    Restaurante.create({
        nombre,
        direccion,
        tipo,
        imagen
    })
        .then(restaurante => res.status(201).json(restaurante))
        .catch(err => res.status(400).json({ error: err }));

}

