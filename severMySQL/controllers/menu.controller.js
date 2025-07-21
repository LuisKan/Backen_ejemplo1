
const { Menu, Restaurante, TipoComida } = require('../models/index');

// Crear una nueva relación en el menú
module.exports.crearMenu = (req, res) => {
    const { restauranteId, tipoComidaId, fechaRegistro } = req.body;
    
    const menuData = {
        restauranteId,
        tipoComidaId,
        fechaRegistro: fechaRegistro || new Date()
    };

    Menu.create(menuData)
        .then(menu => {
            res.status(201).json(menu);
        })
        .catch(err => {
            res.status(400).json({
                message: "Error al crear la relación en el menú",
                error: err
            });
        });
};

// Obtener todos los menús con información de restaurante y tipo de comida
module.exports.obtenerTodosLosMenus = (req, res) => {
    Menu.findAll({
        include: [
            {
                model: Restaurante,
                as: 'restaurante'
            },
            {
                model: TipoComida,
                as: 'tipoComida'
            }
        ]
    })
        .then(menus => {
            res.json(menus);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al obtener los menús",
                error: err
            });
        });
};

// Obtener un menú específico por ID
module.exports.obtenerMenuPorId = (req, res) => {
    const { id } = req.params;
    
    Menu.findByPk(id, {
        include: [
            {
                model: Restaurante,
                as: 'restaurante'
            },
            {
                model: TipoComida,
                as: 'tipoComida'
            }
        ]
    })
        .then(menu => {
            if (!menu) {
                return res.status(404).json({
                    message: "Menú no encontrado"
                });
            }
            res.json(menu);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al obtener el menú",
                error: err
            });
        });
};

// Obtener menús por restaurante
module.exports.obtenerMenusPorRestaurante = (req, res) => {
    const { restauranteId } = req.params;
    
    Menu.findAll({
        where: { restauranteId },
        include: [
            {
                model: Restaurante,
                as: 'restaurante'
            },
            {
                model: TipoComida,
                as: 'tipoComida'
            }
        ]
    })
        .then(menus => {
            res.json(menus);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al obtener los menús del restaurante",
                error: err
            });
        });
};

// Obtener menús por tipo de comida
module.exports.obtenerMenusPorTipoComida = (req, res) => {
    const { tipoComidaId } = req.params;
    
    Menu.findAll({
        where: { tipoComidaId },
        include: [
            {
                model: Restaurante,
                as: 'restaurante'
            },
            {
                model: TipoComida,
                as: 'tipoComida'
            }
        ]
    })
        .then(menus => {
            res.json(menus);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al obtener los menús por tipo de comida",
                error: err
            });
        });
};

// Actualizar una relación de menú
module.exports.actualizarMenu = (req, res) => {
    const { id } = req.params;
    const { restauranteId, tipoComidaId, fechaRegistro } = req.body;
    
    Menu.findByPk(id)
        .then(menu => {
            if (!menu) {
                return res.status(404).json({
                    message: "Menú no encontrado"
                });
            }
            
            return menu.update({
                restauranteId: restauranteId || menu.restauranteId,
                tipoComidaId: tipoComidaId || menu.tipoComidaId,
                fechaRegistro: fechaRegistro || menu.fechaRegistro
            });
        })
        .then(menuActualizado => {
            res.json(menuActualizado);
        })
        .catch(err => {
            res.status(400).json({
                message: "Error al actualizar el menú",
                error: err
            });
        });
};

// Eliminar una relación de menú
module.exports.eliminarMenu = (req, res) => {
    const { id } = req.params;
    
    Menu.findByPk(id)
        .then(menu => {
            if (!menu) {
                return res.status(404).json({
                    message: "Menú no encontrado"
                });
            }
            
            return menu.destroy();
        })
        .then(() => {
            res.json({
                message: "Menú eliminado exitosamente"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al eliminar el menú",
                error: err
            });
        });
};

//obtener los tipos de comida de cada restaurante
module.exports.obtenerTiposComidaPorRestaurante = (req, res) => {   
    const { restauranteId } = req.params;

    Restaurante.findByPk(restauranteId, {
        include: [{
            model: TipoComida,
            as: 'tiposComida',
            through: { attributes: [] } // Excluir atributos de la tabla intermedia
        }]
    })
        .then(restaurante => {
            if (!restaurante) {
                return res.status(404).json({ message: "Restaurante no encontrado" });
            }
            res.json(restaurante.tiposComida);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al obtener los tipos de comida del restaurante",
                error: err
            });
        });
}

//obtener los tipos de restaurante por comida
module.exports.obtenerRestaurantesPorTipoComida = (req, res) => {
    const { tipoComidaId } = req.params;

    TipoComida.findByPk(tipoComidaId, {
        include: [{
            model: Restaurante,
            as: 'restaurantes',
            through: { attributes: [] } // Excluir atributos de la tabla intermedia
        }]
    })
        .then(tipoComida => {
            if (!tipoComida) {
                return res.status(404).json({ message: "Tipo de comida no encontrado" });
            }
            res.json(tipoComida.restaurantes);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al obtener los restaurantes por tipo de comida",
                error: err
            });
        });
};


