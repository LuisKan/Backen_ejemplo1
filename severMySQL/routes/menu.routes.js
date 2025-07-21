const MenuController = require('../controllers/menu.controller');

module.exports = function(app) {
    // Crear una nueva relación en el menú
    app.post('/api/menus', MenuController.crearMenu);
    
    // Obtener todos los menús
    app.get('/api/menus', MenuController.obtenerTodosLosMenus);
    
    // Obtener un menú específico por ID
    app.get('/api/menus/:id', MenuController.obtenerMenuPorId);
    
    // Obtener menús por restaurante
    app.get('/api/menus/restaurante/:restauranteId', MenuController.obtenerMenusPorRestaurante);
    
    // Obtener menús por tipo de comida
    app.get('/api/menus/tipocomida/:tipoComidaId', MenuController.obtenerMenusPorTipoComida);
    
    // Actualizar una relación de menú
    app.put('/api/menus/:id', MenuController.actualizarMenu);
    
    // Eliminar una relación de menú
    app.delete('/api/menus/:id', MenuController.eliminarMenu);

    // Obtener tipos de comida por restaurante
    app.get('/api/menus/tiposComida/restaurante/:restauranteId', MenuController.obtenerTiposComidaPorRestaurante);  

    //obtener los tipos de restaurante por comida
    app.get('/api/v1/restauranteByTipoC/:tipoComidaId', MenuController.obtenerRestaurantesPorTipoComida);
};
