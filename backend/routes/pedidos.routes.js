const express = require('express');
const router = express.Router();
const db = require('../database'); // Asegúrate de que apunte a tu conexión de MySQL

router.post('/finalizar-compra', async (req, res) => {
    // Recibimos los datos del frontend (id_usuario 1 para Carlos Vega)
    const { id_usuario, total, metodo_pago, items } = req.body;

    try {
        // 1. Insertar el encabezado del pedido
        // La fecha_pedido se genera sola si en MySQL pusiste CURRENT_TIMESTAMP
        const queryPedido = `
            INSERT INTO pedidos (id_usuario, total, estado_pedido, metodo_pago) 
            VALUES (?, ?, ?, ?)
        `;
        const [resultPedido] = await db.query(queryPedido, [
            id_usuario, 
            total, 
            'pendiente', // Estado por defecto según tu lógica
            metodo_pago
        ]);

        const id_pedido_generado = resultPedido.insertId;

        // 2. Insertar los detalles (el contenido del carrito)
        // Preparamos los datos para un INSERT múltiple
        const queryDetalle = `
            INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario) 
            VALUES ?
        `;
        const valoresDetalle = items.map(item => [
            id_pedido_generado,
            item.producto.id_producto,
            item.cantidad,
            item.producto.precio
        ]);

        await db.query(queryDetalle, [valoresDetalle]);

        res.status(200).json({
            success: true,
            mensaje: 'Pedido #' + id_pedido_generado + ' procesado con éxito',
            id_pedido: id_pedido_generado
        });

    } catch (error) {
        console.error('Error al procesar la compra:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error al guardar en la base de datos market_db'
        });
    }
});

module.exports = router;