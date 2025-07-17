const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const TipoComida = sequelize.define('TipoComida', {
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
            len: { args: [1, 100], msg: "El nombre debe tener entre 1 y 100 caracteres" }
        }
    },
    paisOrigen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "País de origen es requerido" },
            len: { args: [1, 50], msg: "El país de origen debe tener entre 1 y 50 caracteres" }
        }
    }
});

module.exports = TipoComida;
