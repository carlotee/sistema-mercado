const express = require('express');
const cors = require('cors');
const db = require('./database.js'); 

// 1. IMPORTACIÓN DE RUTAS
const authRoutes = require('./routes/auth.routes.js');

const app = express();

// 2. MIDDLEWARES
app.use(cors()); 
app.use(express.json()); // Necesario para leer los datos del formulario de registro

// 3. USO DE RUTAS (Sin prefijo /api, directas como pediste)
app.use('/', authRoutes); 

// 4. RUTA DE PRUEBA DE BASE DE DATOS (market_db)
app.get('/test-db', async (req, res) => {
  try {
    // Verificamos la tabla usuarios que ya tienes con datos
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

// Ruta raíz del backend
app.get('/', (req, res) => {
    res.send('API de Sistema Mercado funcionando correctamente');
});

// 5. MANEJO GLOBAL DE ERRORES
// Esto evita que el servidor se detenga si hay un error en una consulta SQL
app.use((err, req, res, next) => {
    console.error("Error no controlado:", err.stack);
    res.status(500).send({ mensaje: 'Error interno en el servidor de mercado' });
});

// 6. CONFIGURACIÓN DEL PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`✅ Rutas de Auth (Login/Registro) activas`);
    console.log(`✅ Prueba de conexión: http://localhost:${PORT}/test-db\n`);
});