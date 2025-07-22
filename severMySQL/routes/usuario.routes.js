const UsuarioController = require('../controllers/usuario.controller');

module.exports = function(app){

    app.post('/api/usuarios', UsuarioController.createUsuario) // Crear un nuevo usuario
    app.get('/api/usuarios', UsuarioController.getAllUsuarios) // Obtener todos los usuarios
    app.get('/api/usuarios/buscar', UsuarioController.getUsuariosByNombre) // Buscar usuarios por nombre
    app.get('/api/usuarios/:id', UsuarioController.getUsuarioById) // Obtener un usuario por ID
    app.put('/api/usuarios/:id', UsuarioController.updateUsuarioById) // Actualizar un usuario por ID
    app.delete('/api/usuarios/:id', UsuarioController.deleteUsuarioById) // Eliminar un usuario por ID
    app.post('/api/usuarios/login', UsuarioController.loginUsuario) // Autenticar usuario (login)
    
}
