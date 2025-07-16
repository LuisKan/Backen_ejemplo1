const RestauranteController = require('../controllers/restaurante.controller');

module.exports = function(app){

    app.post('/api/restaurantes', RestauranteController.createRestaurante) // Crear un nuevo restaurante
    app.get('/api/restaurantes', RestauranteController.getAllRestaurantes) // Obtener todos los restaurantes
    app.get('/api/restaurantes/puntuacion', RestauranteController.getRestaurantesByPuntuacion) // Obtener restaurantes por puntuación mínima
    app.get('/api/restaurantes/:id', RestauranteController.getRestauranteById) // Obtener un restaurante por ID
    app.put('/api/restaurantes/:id', RestauranteController.updateRestauranteById) // Actualizar un restaurante por ID
    app.delete('/api/restaurantes/:id', RestauranteController.deleteRestauranteById) // Eliminar un restaurante por ID
    app.get('/api/restaurantes/puntuacion/range/:min/:max', RestauranteController.getRestaurantesByPuntuacionRange) // Obtener restaurantes por rango de puntuación
    
    
}