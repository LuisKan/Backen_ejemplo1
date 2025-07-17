/*const express = require('express'); 
const app = express(); 
const port = 8000; 


const restaurantes = [
  { id: 1, nombre: "Restaurante San Jose", direccion: "Ladron de Guevara E11-253", tipo: "Ecuatoriana" },
  { id: 2, nombre: "La Parrilla", direccion: "Av. Amazonas N34-123", tipo: "Parrillada" },
  { id: 3, nombre: "El Buen Sabor", direccion: "Calle 10 de Agosto S12-456", tipo: "Comida Rápida" },
  { id: 4, nombre: "Sabor Andino", direccion: "Av. Colón E5-789", tipo: "Andina" }
];

//---------------------------------------------------------------------//
app.get('/api/restaurantes', (req, res) => {

    res.json(restaurantes);
  
});

app.post('/api/restaurantes', (req, res) => {
    
  console.log(req.body); // Imprime el cuerpo de la petición
  restaurantes.push(req.body); // Agrega el nuevo restaurante al array
  res.json({status:"ok"}); // Responde con el nuevo restaurante
});

// Ruta para obtener un restaurante específico por su id
app.get('/api/restaurantes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const restaurante = restaurantes.find(r => r.id === id);

  if (!restaurante) {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }

  res.json(restaurante);
});


app.put('/api/restaurantes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = restaurantes.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }

  // Actualiza solo los campos enviados en el body
  restaurantes[index] = { ...restaurantes[index], ...req.body };
  res.json(restaurantes[index]);
});


app.delete('/api/restaurantes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = restaurantes.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }

  restaurantes.splice(index, 1);
  res.json({ status: "ok" });
});


//--------------------------------------------------------------------//

app.use(express.json()); // Middleware para parsear JSON(se ejecuta antes de las rutas 
// y permite que el cuerpo de la petición sea un objeto JSON)

app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios

app.get('/restaurantes', (_, response) => { 
  //response.json({ nombre: "Restaurante San Jose", direccion: "Ladron de Guevara E11-253"});
  //response.send('¡Hola Mundo!');
  response.status(200).send('¡Hola!');
  //response.status(404).send('¡No encontrado!');
  
}); 

app.get('/', function (_, res) { 
  res.send('¡Hola Mundo!'); 
}); 

app.post('/restaurantes', (req, res) => { 
  console.log(req.body); // Imprime el cuerpo de la petición
  res.status(201).send('Restaurante creado'); 

  console.log(req.query); // Imprime los parámetros de la consulta
  console.log(req.params); // Imprime los parámetros de la ruta
  console.log(req.headers); // Imprime los encabezados de la petición
  console.log(req.method); // Imprime el método de la petición
});

app.listen(port, function () { 
  console.log('app.js escuchando en el puerto siguiente', port); 
});

*/
/*const cors = require('cors');


const express = require('express');

const app = express();  
const port = 8000;
require('./config/mongoose.config')
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const allUserRoutes = require('./routes/restaurante.routes');
allUserRoutes(app); 
app.listen(port, () => {
   console.log("Server listening at port", port); 
  })*/

   const cors = require('cors');


const express = require('express');

const app = express();  
const port = 8000;
require('../severMySQL/config/sequelize.config'); // Importar la configuración de Sequelize para inicializar la conexión a la base de datos
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const allUserRoutes = require('../severMySQL/routes/restaurante.routes'); // Importar las rutas de los restaurantes
allUserRoutes(app); 
app.listen(port, () => {
   console.log("Server listening at port", port); 
  })