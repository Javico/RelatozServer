const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

// crear el servidor
const app = express();

// conectar a base de datos
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true}));

// puerto de la app
const PORT = process.env.PORT || 4000;

// definir la pagina principal
// app.get('/', (req, res) => {
//     res.send("hola mundo xd");
// });

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/historias', require('./routes/historias'));
app.use('/api/historiadetalle', require('./routes/historia'));

// arrancar la app
app.listen(PORT, () => {
    console.log(`funcionando en el puerto ${PORT}`);
});