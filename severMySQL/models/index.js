// Importar la instancia de sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

// Definir los modelos directamente aquí para evitar dependencias circulares
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
            notNull: { msg: "Nombre es requerido" }
        }
    },
    paisOrigen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "País de origen es requerido" }
        }
    }
});

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

// Definir las asociaciones aquí para evitar dependencias circulares
// Asociaciones del modelo Menu
Menu.belongsTo(Restaurante, { foreignKey: 'restauranteId', as: 'restaurante' });
Menu.belongsTo(TipoComida, { foreignKey: 'tipoComidaId', as: 'tipoComida' });

// Asociaciones inversas
Restaurante.hasMany(Menu, { foreignKey: 'restauranteId', as: 'menus' });
TipoComida.hasMany(Menu, { foreignKey: 'tipoComidaId', as: 'menus' });

// Asociación many-to-many a través de Menu
Restaurante.belongsToMany(TipoComida, { 
    through: Menu, 
    foreignKey: 'restauranteId', 
    otherKey: 'tipoComidaId', 
    as: 'tiposComida' 
});
TipoComida.belongsToMany(Restaurante, { 
    through: Menu, 
    foreignKey: 'tipoComidaId', 
    otherKey: 'restauranteId', 
    as: 'restaurantes' 
});

// Exportar los modelos y sequelize
module.exports = {
    sequelize,
    Restaurante,
    TipoComida,
    Menu,
    Usuario
};
