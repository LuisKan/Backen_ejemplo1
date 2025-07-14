const RestauranteController = require('../controllers/restaurante.controller');

module.exports = function(app){

    app.post('/api/restaurantes', RestauranteController.createRestaurante) // Crear un nuevo restaurante
}