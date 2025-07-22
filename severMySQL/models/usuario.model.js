const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Usuario = sequelize.define('Usuario', {
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            notNull: { msg: "Id es requerido" }
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Nombre es requerido" },
            len: {
                args: [2, 50],
                msg: "El nombre debe tener entre 2 y 50 caracteres"
            }
        }
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: "Correo es requerido" },
            isEmail: { msg: "Debe ser un correo electrónico válido" }
        }
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Contraseña es requerida" },
            len: {
                args: [6, 100],
                msg: "La contraseña debe tener al menos 6 caracteres"
            }
        }
    }
});

module.exports = Usuario;
