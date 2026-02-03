const express = require('express');
const cors = require('cors');
const db = require('./database.js'); 
const authRoutes = require('./routes/auth.routes.js'); // 1. IMPORTA tus rutas de autenticación
const app = express();

app.use(cors()); 
app.use(express.json());

// 2. USA las rutas. 
// Si quieres que la URL sea http://localhost:3000/login, déjalo así:
app.use('/', authRoutes); 

// Ruta de prueba para verificar la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ 
      mensaje: 'Conexión exitosa con la base de datos mercado_db', 
      resultado: rows 
    });
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al conectar con la base de datos', 
      error: error.message 
    });
  }
});

app.get('/', (req, res) => res.send('API de Market funcionando'));

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
    console.log('Ruta de login lista en http://localhost:3000/login');
});