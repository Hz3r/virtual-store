// controllers/order.controller.js
import Order from '../models/Order.js';
import Producto from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const productosCliente = req.body; // [{ _id, cantidad }]
    const userId = req.user.id; // El id del usuario logueado

    const ids = productosCliente.map(p => p._id);
    const productosDB = await Producto.find({ _id: { $in: ids } });

    if (productosDB.length === 0) {
      return res.status(400).json({ error: 'Productos no encontrados' });
    }

    const items = productosCliente.map(({ _id, cantidad }) => {
      const producto = productosDB.find(p => p._id.toString() === _id);
      if (!producto) return null;

      return {
        title: `${producto.nombre} x${cantidad}`,
        description: `Duración: ${producto.caracteristicas.duracion}, Calidad: ${producto.caracteristicas.calidad}, Región: ${producto.caracteristicas.region}`,
        quantity: cantidad,
        unit_price: producto.precio,
        currency_id: 'PEN'
      };
    }).filter(Boolean);

    const total = items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);

    const newOrder = new Order({
      user: userId,
      items,
      total,
      status: 'pending', // Inicialmente la orden está pendiente
      paymentStatus: 'pending', // El pago está pendiente
    });

    await newOrder.save();

    res.status(201).json({ message: 'Orden creada con éxito', orderId: newOrder._id });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ error: 'Error al procesar la orden' });
  }
};

// Puedes agregar más funciones como getOrderHistory si necesitas ver el historial de compras del usuario.
// controllers/order.controller.js
export const getOrderHistory = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await Order.find({ user: userId });
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error al obtener el historial de órdenes:', error);
      res.status(500).json({ error: 'Error al obtener el historial de órdenes' });
    }
  };
  