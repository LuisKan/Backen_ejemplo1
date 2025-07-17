const TipoComidaController = require('../controllers/tipoComida.controller');

module.exports = function(app){

    app.post('/api/tipos-comida', TipoComidaController.createTipoComida) // Crear un nuevo tipo de comida
    app.get('/api/tipos-comida', TipoComidaController.getAllTiposComida) // Obtener todos los tipos de comida
    app.get('/api/tipos-comida/:id', TipoComidaController.getTipoComidaById) // Obtener un tipo de comida por ID
    app.put('/api/tipos-comida/:id', TipoComidaController.updateTipoComidaById) // Actualizar un tipo de comida por ID
    app.delete('/api/tipos-comida/:id', TipoComidaController.deleteTipoComidaById) // Eliminar un tipo de comida por ID
    app.get('/api/tipos-comida/pais/:pais', TipoComidaController.getTiposComidaByPais) // Obtener tipos de comida por país de origen
    
}
