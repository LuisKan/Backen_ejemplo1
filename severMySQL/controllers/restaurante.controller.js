const Restaurante = require('../models/restaurante.model');
const { Op } = require('sequelize');

// Crear un nuevo restaurante
module.exports.createRestaurante = async (req, res) => {
    const { nombre, direccion, tipo, imagen, puntuacion } = req.body;

    if (!nombre || !direccion) {
        return res.status(400).json({ error: "Los campos 'nombre' y 'direccion' son obligatorios" });
    }

    if (puntuacion !== undefined && (puntuacion < 0 || puntuacion > 5)) {
        return res.status(400).json({ error: "La puntuación debe estar entre 0 y 5" });
    }

    try {
        const existente = await Restaurante.findOne({ where: { nombre } });
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
        res.status(400).json({ error: "Error al crear el restaurante" });
    }
}

// Obtener todos los restaurantes
module.exports.getAllRestaurantes = async (req, res) => {
    try {
        const restaurantes = await Restaurante.findAll();
        res.status(200).json(restaurantes);
    } catch (err) {
        res.status(400).json({ error: "Error al obtener los restaurantes" });
    }
}

// Obtener un restaurante por ID
module.exports.getRestauranteById = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).json({ error: "Restaurante no encontrado" });
        }
        res.status(200).json(restaurante);
    } catch (err) {
        res.status(400).json({ error: "Error al buscar el restaurante por ID" });
    }
}

// Actualizar un restaurante por ID
module.exports.updateRestauranteById = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, tipo, imagen, puntuacion } = req.body;

    if (puntuacion !== undefined && (puntuacion < 0 || puntuacion > 5)) {
        return res.status(400).json({ error: "La puntuación debe estar entre 0 y 5" });
    }

    try {
        const [updatedRows] = await Restaurante.update(
            { nombre, direccion, tipo, imagen, puntuacion },
            { where: { _id: id }, returning: true }
        );
        
        if (updatedRows === 0) {
            return res.status(404).json({ error: "Restaurante no encontrado" });
        }

        const restaurante = await Restaurante.findByPk(id);
        res.status(200).json(restaurante);
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar el restaurante" });
    }
}

// Obtener restaurantes por puntuación mínima
module.exports.getRestaurantesByPuntuacion = async (req, res) => {
    const { minPuntuacion } = req.query;

    if (!minPuntuacion) {
        return res.status(400).json({ error: "El parámetro 'minPuntuacion' es requerido" });
    }

    const puntuacion = parseFloat(minPuntuacion);
    if (isNaN(puntuacion) || puntuacion < 0 || puntuacion > 5) {
        return res.status(400).json({ error: "La puntuación debe ser un número entre 0 y 5" });
    }

    try {
        const restaurantes = await Restaurante.findAll({ 
            where: { 
                puntuacion: { 
                    [Op.gte]: puntuacion 
                } 
            } 
        });
        res.status(200).json(restaurantes);
    } catch (err) {
        res.status(400).json({ error: "Error al obtener los restaurantes por puntuación" });
    }
}

// Eliminar un restaurante por ID
module.exports.deleteRestauranteById = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).json({ error: "Restaurante no encontrado" });
        }
        
        await Restaurante.destroy({ where: { _id: id } });
        res.status(200).json({ message: "Restaurante eliminado exitosamente", restaurante });
    } catch (err) {
        res.status(400).json({ error: "Error al eliminar el restaurante" });
    }
}

// Obtener los restaurantes que tengan una puntuación dentro de un rango enviado por la ruta
module.exports.getRestaurantesByPuntuacionRange = async (req, res) => {
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

    try {
        const restaurantes = await Restaurante.findAll({ 
            where: { 
                puntuacion: { 
                    [Op.gte]: minPuntuacion, 
                    [Op.lte]: maxPuntuacion 
                } 
            } 
        });
        res.status(200).json(restaurantes);
    } catch (err) {
        res.status(400).json({ error: "Error al obtener los restaurantes por rango de puntuación" });
    }
}
