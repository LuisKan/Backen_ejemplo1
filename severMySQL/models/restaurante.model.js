const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Restaurante = sequelize.define('Restaurante', {
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
            notNull: { msg: "Nombre es requerido" }
        }
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Direccion es requerido" }
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Tipo es requerido" }
        }
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Imagen es requerido" }
        }
    },
    puntuacion: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: { args: [0], msg: "La puntuación no puede ser menor a 0" },
            max: { args: [5], msg: "La puntuación no puede ser mayor a 5" }
        }
    }
});

module.exports = Restaurante;
