const express = require('express');
const router = express.Router();
const db = require('../database.js'); // Importamos tu conexión

// ==========================
// LOGIN (Tu código original)
// ==========================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
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
// REGISTRO (Tu código original)
// ==========================
router.post('/registro', async (req, res) => {
    const { nombre, apellido, email, password, telefono, direccion } = req.body;

    try {
        const query = `
            INSERT INTO usuarios (nombre, apellido, email, password, telefono, direccion, estado) 
            VALUES (?, ?, ?, ?, ?, ?, 'activo')
        `;
        
        await db.query(query, [nombre, apellido, email, password, telefono, direccion]);
        
        res.status(201).json({ mensaje: '¡Registro exitoso!' });
    } catch (error) {
        console.error("Error en SQL:", error);
        res.status(500).json({ mensaje: 'Error al registrar', error: error.message });
    }
});

// ==========================================================
// 🆕 NUEVAS RUTAS: GESTIÓN DE TIENDA (JEFE / TRABAJADOR)
// ==========================================================

// 1. OBTENER CATEGORÍAS (Para el buscador y filtros del Cliente)
router.get('/categorias', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. CREAR CATEGORÍA (Solo para el Dashboard del Jefe)
router.post('/categorias', async (req, res) => {
    const { nombre_categoria, descripcion } = req.body;
    try {
        await db.query('INSERT INTO categorias (nombre_categoria, descripcion) VALUES (?, ?)', [nombre_categoria, descripcion]);
        res.status(201).json({ mensaje: 'Categoría creada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. AGREGAR PRODUCTO (Gestión del Jefe)
router.post('/productos', async (req, res) => {
    const { nombre, descripcion, precio, stock, id_categoria, imagen_url } = req.body;
    try {
        const query = `
            INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, imagen_url, estado) 
            VALUES (?, ?, ?, ?, ?, ?, 'activo')
        `;
        await db.query(query, [nombre, descripcion, precio, stock, id_categoria, imagen_url]);
        res.status(201).json({ mensaje: 'Producto agregado al inventario' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. VER TODOS LOS PRODUCTOS (Para la navegación de la tienda)
router.get('/productos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos WHERE estado = "activo"');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;