// En tu backend/routes/productos.routes.js
router.post('/agregar', async (req, res) => {
    const { nombre, precio, stock, descripcion, rol_usuario } = req.body;

    // Verificación de seguridad básica
    if (rol_usuario !== 'admin' && rol_usuario !== 'empleado') {
        return res.status(403).json({ mensaje: "Acceso denegado. No eres empleado." });
    }

    try {
        const query = 'INSERT INTO productos (nombre, precio, stock, descripcion) VALUES (?, ?, ?, ?)';
        await db.query(query, [nombre, precio, stock, descripcion]);
        res.json({ success: true, mensaje: "Producto agregado y visible para clientes" });
    } catch (error) {
        res.status(500).send("Error al insertar producto");
    }
});