const Restaurante = require('../models/restaurante.model'); // Importar el Restaurante model

// Crear un nuevo restaurante
module.exports.createRestaurante = async (req, res) => { // Definir la función para crear un restaurante
    const { nombre, direccion, tipo, imagen, puntuacion } = req.body; // Desestructuración

    // Validar que nombre y direccion sean obligatorios
    if (!nombre || !direccion) {
        return res.status(400).json({ error: "Los campos 'nombre' y 'direccion' son obligatorios" });
    }

    // Validar puntuacion si se proporciona
    if (puntuacion !== undefined && (puntuacion < 0 || puntuacion > 5)) {
        return res.status(400).json({ error: "La puntuación debe estar entre 0 y 5" });
    }

    try {
        // Verificar si ya existe un restaurante con el mismo nombre
        const existente = await Restaurante.findOne({ nombre });
        if (existente) {
            return res.status(409).json({ error: "Ya existe un restaurante con ese nombre" });
        }

        const restaurante = await Restaurante.create({
            nombre,
            direccion,
            tipo,
            imagen,
            puntuacion
        });
        res.status(201).json(restaurante);
    } catch (err) {
        res.status(400).json({ error: err });
    }
}
// Obtener todos los restaurantes
module.exports.getAllRestaurantes = (req, res) => { // Definir la función para obtener todos los restaurantes
    Restaurante.find()
        .then(restaurantes => res.status(200).json(restaurantes))
        .catch(err => res.status(400).json({ error: err }));
}
// Obtener un restaurante por ID
module.exports.getRestauranteById = (req, res) => { // Definir la función para obtener un restaurante por ID
    const { id } = req.params; // Obtener el ID del parámetro de la ruta
    Restaurante.findById(id)
        .then(restaurante => {
            if (!restaurante) {
                return res.status(404).json({ error: "Restaurante no encontrado" });
            }
            res.status(200).json(restaurante);
        })
        .catch(err => res.status(400).json({ error: err}));
}
// Actualizar un restaurante por ID
module.exports.updateRestauranteById = (req, res) => { // Definir la función para actualizar un restaurante por ID
    const { id } = req.params; // Obtener el ID del parámetro de la ruta
    const { nombre, direccion, tipo, imagen, puntuacion } = req.body; // Desestructuración
    
    // Validar puntuacion si se proporciona
    if (puntuacion !== undefined && (puntuacion < 0 || puntuacion > 5)) {
        return res.status(400).json({ error: "La puntuación debe estar entre 0 y 5" });
    }
    
    Restaurante.findByIdAndUpdate(id, {
        nombre,
        direccion,
        tipo,
        imagen,
        puntuacion
    }, { new: true }) // new: true para devolver el documento actualizado
        .then(restaurante => {
            if (!restaurante) {
                return res.status(404).json({ error: "Restaurante no encontrado" });
            }
            res.status(200).json(restaurante);
        })
        .catch(err => res.status(400).json({ error: err }));
}
// Obtener restaurantes por puntuación mínima
module.exports.getRestaurantesByPuntuacion = (req, res) => {
    const { minPuntuacion } = req.query; // Obtener la puntuación mínima de los query parameters
    
    if (!minPuntuacion) {
        return res.status(400).json({ error: "El parámetro 'minPuntuacion' es requerido" });
    }
    
    const puntuacion = parseFloat(minPuntuacion);
    if (isNaN(puntuacion) || puntuacion < 0 || puntuacion > 5) {
        return res.status(400).json({ error: "La puntuación debe ser un número entre 0 y 5" });
    }
    
    Restaurante.find({ puntuacion: { $gte: puntuacion } })
        .then(restaurantes => res.status(200).json(restaurantes))
        .catch(err => res.status(400).json({ error: err }));
}
// Eliminar un restaurante por ID
module.exports.deleteRestauranteById = (req, res) => { // Definir la función para eliminar un restaurante por ID
    const { id } = req.params; // Obtener el ID del parámetro de la ruta
    Restaurante.findByIdAndDelete(id)
        .then(restaurante => {
            if (!restaurante) {
                return res.status(404).json({ error: "Restaurante no encontrado" });
            }
            res.status(200).json({ message: "Restaurante eliminado exitosamente", restaurante });
        })
        .catch(err => res.status(400).json({ error: err }));
}

//Obtener los restaurantes que tengan una puntuacion entre 3 y 5
// Obtener los restaurantes que tengan una puntuación dentro de un rango enviado por la ruta
module.exports.getRestaurantesByPuntuacionRange = (req, res) => {
    const { min, max } = req.params;

    const minPuntuacion = parseFloat(min);
    const maxPuntuacion = parseFloat(max);

    if (
        isNaN(minPuntuacion) || isNaN(maxPuntuacion) ||
        minPuntuacion < 0 || maxPuntuacion > 5 ||
        minPuntuacion > maxPuntuacion
    ) {
        return res.status(400).json({ error: "Los valores de puntuación deben estar entre 0 y 5, y min <= max" });
    }

    Restaurante.find({ puntuacion: { $gte: minPuntuacion, $lte: maxPuntuacion } })
        .then(restaurantes => res.status(200).json(restaurantes))
        .catch(err => res.status(400).json({ error: err }));
}
