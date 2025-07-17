const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Menu = sequelize.define('Menu', {
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            notNull: { msg: "Id es requerido" }
        }
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            notNull: { msg: "Fecha de registro es requerida" },
            isDate: { msg: "Debe ser una fecha válida" }
        }
    },
    restauranteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Id del restaurante es requerido" }
        }
    },
    tipoComidaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Id del tipo de comida es requerido" }
        }
    }
}, {
    // Índice único compuesto para evitar duplicados en la relación
    indexes: [
        {
            unique: true,
            fields: ['restauranteId', 'tipoComidaId']
        }
    ]
});

module.exports = Menu;
