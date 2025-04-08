import { MercadoPagoConfig, Preference } from 'mercadopago';
import mercadopago from 'mercadopago';
import Producto from '../models/Product.js';
import Order from '../models/Order.js'; // Asegúrate de tener un modelo para las órdenes
import 'dotenv/config';

// Configurar MercadoPago
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const preference = new Preference(client);

// Crear una nueva orden
export const createOrder = async (req, res) => {
    try {
        const productosCliente = req.body; // [{ _id, cantidad }]
        const userId = req.user.id; // Obtener el ID del usuario logueado desde req.user (asegúrate de tener el middleware de autenticación)

        // Obtener los productos desde la base de datos
        const ids = productosCliente.map(p => p._id);
        const productosDB = await Producto.find({ _id: { $in: ids } });

        if (productosDB.length === 0) {
            return res.status(400).json({ error: 'Productos no encontrados' });
        }

        // Crear el arreglo de items para MercadoPago
        const items = productosCliente.map(({ _id, cantidad }) => {
            const producto = productosDB.find(p => p._id.toString() === _id);
            if (!producto) return null;

            return {
                title: `${producto.nombre} x${cantidad}`,
                description: `Duración: ${producto.caracteristicas.duracion}, Calidad: ${producto.caracteristicas.calidad}, Región: ${producto.caracteristicas.region}`,
                quantity: cantidad,
                unit_price: producto.precio,
                currency_id: 'PEN',
            };
        }).filter(Boolean);

        // Crear la orden en la base de datos primero
        const total = items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);
        const newOrder = new Order({
            user: userId,
            items,
            total,
            status: 'pending', // Estado de la orden antes de la confirmación del pago
            paymentStatus: 'pending', // Estado del pago
        });
        await newOrder.save();

        // Crear la preferencia de pago en MercadoPago con la metadata que contiene el orderId
        const response = await preference.create({
            body: {
                items,
                back_urls: {
                    success: 'http://localhost:4000/payment/success',
                    pending: 'http://localhost:4000/payment/pending',
                    failure: 'http://localhost:4000/payment/failure',
                },
                auto_return: 'approved',
                metadata: {
                    orderId: newOrder._id.toString()  // Aquí pasamos el ID de MongoDB a la metadata
                }
            },
        });

        // Responder con el link de pago
        res.status(200).json({ init_point: response.init_point, orderId: newOrder._id });
    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).json({ error: 'Error al procesar el pago' });
    }
};

// Respuesta para pagos completados
export const success = (req, res) => {
    res.send('✅ Pago completado');
};

// Respuesta para pagos pendientes
export const pending = (req, res) => {
    res.send('⌛ Tu pago está pendiente');
};

// Respuesta para pagos fallidos
export const failure = (req, res) => {
    res.send('❌ El pago fue rechazado o cancelado');
};

export const handleWebhook = async (req, res) => {
    try {
        const paymentId = req.body.data?.id;
        if (!paymentId) return res.status(400).send('No hay ID de pago');

        // Consultar los detalles del pago desde MercadoPago
        const { body: payment } = await mercadopago.payment.findById(paymentId);

        // Obtener el orderId desde metadata
        const orderId = payment.metadata?.orderId;
        if (!orderId) {
            console.error('⚠️ No se encontró el orderId en metadata');
            return res.sendStatus(400);
        }

        // Verificar el estado del pago
        const paymentStatus = payment.status;

        // Buscar la orden en la base de datos
        const order = await Order.findById(orderId);
        if (!order) {
            console.error('⚠️ No se encontró la orden con el orderId');
            return res.sendStatus(400);
        }

        // Actualizar la orden según el estado del pago
        await Order.findByIdAndUpdate(orderId, {
            status: paymentStatus === 'approved' ? 'approved' : 'pending',
            paymentStatus,
        });

        res.sendStatus(200);  // Responde con OK

    } catch (error) {
        console.error('❌ Error en webhook:', error);
        res.sendStatus(500);  // Error interno
    }
};
