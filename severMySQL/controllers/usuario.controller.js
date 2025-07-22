const { Usuario } = require('../models/index');
const { Op } = require('sequelize');

// Crear un nuevo usuario
module.exports.createUsuario = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ error: "Los campos 'nombre', 'correo' y 'contraseña' son obligatorios" });
    }

    try {
        const existente = await Usuario.findOne({ where: { correo } });
        if (existente) {
            return res.status(409).json({ error: "Ya existe un usuario con ese correo electrónico" });
        }

        const usuario = await Usuario.create({
            nombre,
            correo,
            contraseña
        });

        // No devolvemos la contraseña en la respuesta por seguridad
        const { contraseña: _, ...usuarioSinContraseña } = usuario.toJSON();
        res.status(201).json(usuarioSinContraseña);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errores = err.errors.map(error => error.message);
            return res.status(400).json({ error: "Error de validación", detalles: errores });
        }
        res.status(400).json({ error: "Error al crear el usuario" });
    }
}

// Obtener todos los usuarios
module.exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['contraseña'] } // Excluir contraseña de la respuesta
        });
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
}

// Obtener un usuario por ID
module.exports.getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ['contraseña'] } // Excluir contraseña de la respuesta
        });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (err) {
        res.status(400).json({ error: "Error al buscar el usuario por ID" });
    }
}

// Actualizar un usuario por ID
module.exports.updateUsuarioById = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña } = req.body;

    try {
        // Verificar si el correo ya existe (excepto para el usuario actual)
        if (correo) {
            const existente = await Usuario.findOne({ 
                where: { 
                    correo: correo,
                    _id: { [Op.ne]: id }
                } 
            });
            if (existente) {
                return res.status(409).json({ error: "Ya existe otro usuario con ese correo electrónico" });
            }
        }

        const [updatedRows] = await Usuario.update(
            { nombre, correo, contraseña },
            { where: { _id: id }, returning: true }
        );
        
        if (updatedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ['contraseña'] } // Excluir contraseña de la respuesta
        });
        res.status(200).json(usuario);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errores = err.errors.map(error => error.message);
            return res.status(400).json({ error: "Error de validación", detalles: errores });
        }
        res.status(400).json({ error: "Error al actualizar el usuario" });
    }
}

// Eliminar un usuario por ID
module.exports.deleteUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ['contraseña'] }
        });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        await Usuario.destroy({ where: { _id: id } });
        res.status(200).json({ message: "Usuario eliminado exitosamente", usuario });
    } catch (err) {
        res.status(400).json({ error: "Error al eliminar el usuario" });
    }
}

// Buscar usuarios por nombre
module.exports.getUsuariosByNombre = async (req, res) => {
    const { nombre } = req.query;

    if (!nombre) {
        return res.status(400).json({ error: "El parámetro 'nombre' es requerido" });
    }

    try {
        const usuarios = await Usuario.findAll({ 
            where: { 
                nombre: { 
                    [Op.iLike]: `%${nombre}%` // Búsqueda parcial, insensible a mayúsculas
                } 
            },
            attributes: { exclude: ['contraseña'] } // Excluir contraseña de la respuesta
        });
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json({ error: "Error al buscar usuarios por nombre" });
    }
}

// Autenticar usuario (login básico)
module.exports.loginUsuario = async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ error: "Los campos 'correo' y 'contraseña' son obligatorios" });
    }

    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario || usuario.contraseña !== contraseña) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Devolver usuario sin contraseña
        const { contraseña: _, ...usuarioSinContraseña } = usuario.toJSON();
        res.status(200).json({ message: "Login exitoso", usuario: usuarioSinContraseña });
    } catch (err) {
        res.status(400).json({ error: "Error al autenticar usuario" });
    }
}
