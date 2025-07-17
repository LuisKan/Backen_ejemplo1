const { TipoComida } = require('../models/index');
const { Op } = require('sequelize');

// Crear un nuevo tipo de comida
module.exports.createTipoComida = async (req, res) => {
    const { nombre, paisOrigen } = req.body;

    if (!nombre || !paisOrigen) {
        return res.status(400).json({ error: "Los campos 'nombre' y 'paisOrigen' son obligatorios" });
    }

    try {
        const existente = await TipoComida.findOne({ where: { nombre } });
        if (existente) {
            return res.status(409).json({ error: "Ya existe un tipo de comida con ese nombre" });
        }

        const tipoComida = await TipoComida.create({
            nombre,
            paisOrigen
        });
        res.status(201).json(tipoComida);
    } catch (err) {
        res.status(400).json({ error: "Error al crear el tipo de comida" });
    }
}

// Obtener todos los tipos de comida
module.exports.getAllTiposComida = async (req, res) => {
    try {
        const tiposComida = await TipoComida.findAll();
        res.status(200).json(tiposComida);
    } catch (err) {
        res.status(400).json({ error: "Error al obtener los tipos de comida" });
    }
}

// Obtener un tipo de comida por ID
module.exports.getTipoComidaById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoComida = await TipoComida.findByPk(id);
        if (!tipoComida) {
            return res.status(404).json({ error: "Tipo de comida no encontrado" });
        }
        res.status(200).json(tipoComida);
    } catch (err) {
        res.status(400).json({ error: "Error al buscar el tipo de comida por ID" });
    }
}

// Actualizar un tipo de comida por ID
module.exports.updateTipoComidaById = async (req, res) => {
    const { id } = req.params;
    const { nombre, paisOrigen } = req.body;

    try {
        const [updatedRows] = await TipoComida.update(
            { nombre, paisOrigen },
            { where: { _id: id }, returning: true }
        );
        
        if (updatedRows === 0) {
            return res.status(404).json({ error: "Tipo de comida no encontrado" });
        }

        const tipoComida = await TipoComida.findByPk(id);
        res.status(200).json(tipoComida);
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar el tipo de comida" });
    }
}

// Eliminar un tipo de comida por ID
module.exports.deleteTipoComidaById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoComida = await TipoComida.findByPk(id);
        if (!tipoComida) {
            return res.status(404).json({ error: "Tipo de comida no encontrado" });
        }
        
        await TipoComida.destroy({ where: { _id: id } });
        res.status(200).json({ message: "Tipo de comida eliminado exitosamente", tipoComida });
    } catch (err) {
        res.status(400).json({ error: "Error al eliminar el tipo de comida" });
    }
}

// Obtener tipos de comida por país de origen
module.exports.getTiposComidaByPais = async (req, res) => {
    const { pais } = req.params;

    if (!pais) {
        return res.status(400).json({ error: "El parámetro 'pais' es requerido" });
    }

    try {
        const tiposComida = await TipoComida.findAll({ 
            where: { 
                paisOrigen: { 
                    [Op.iLike]: `%${pais}%` 
                } 
            } 
        });
        res.status(200).json(tiposComida);
    } catch (err) {
        res.status(400).json({ error: "Error al obtener los tipos de comida por país" });
    }
}
