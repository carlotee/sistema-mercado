const express = require('express');
const router = express.Router();
const db = require('../database.js'); // Importamos tu conexión

// ==========================
// LOGIN
// ==========================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscamos al usuario en la base de datos mercado_db
    const [usuarios] = await db.query(
      'SELECT * FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );

    if (usuarios.length > 0) {
      res.json({
        success: true,
        mensaje: '¡Bienvenido al Market!',
        usuario: usuarios[0]
      });
    } else {
      res.status(401).json({
        success: false,
        mensaje: 'Credenciales incorrectas.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==========================
// REGISTRO
// ==========================
router.post('/registro', async (req, res) => {
  const { nombre, apellido, email, password, telefono } = req.body;

  try {
    // Verificamos si el usuario ya existe
    const [existe] = await db.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        success: false,
        mensaje: 'El correo ya está registrado'
      });
    }

    // Insertamos nuevo usuario
    const query = `
      INSERT INTO usuarios (nombre, apellido, email, password, telefono)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(query, [nombre, apellido, email, password, telefono]);

    res.json({
      success: true,
      mensaje: 'Usuario registrado correctamente'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
