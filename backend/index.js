const express = require('express');
const cors = require('cors');
const db = require('./database.js'); 
const authRoutes = require('./routes/auth.routes.js');

const app = express();

app.use(cors()); 
app.use(express.json());


app.use('/', authRoutes); 

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS total FROM usuarios');
    res.json({ 
      mensaje: 'Conexión exitosa con la base de datos market_db', 
      servidor: 'OK',
      total_usuarios: rows[0].total 
    });
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ 
      mensaje: 'Error al conectar con la base de datos', 
      error: error.message,
      codigo: error.code 
    });
  }
});

app.get('/', (req, res) => {
    res.send('API de Sistema Mercado funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`✅ Ruta de login: http://localhost:${PORT}/login`);
    console.log(`✅ Ruta de prueba DB: http://localhost:${PORT}/test-db\n`);
});