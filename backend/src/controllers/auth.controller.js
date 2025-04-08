// controllers/auth.controller.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Función para registrar un usuario
export const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  // Validación
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el email ya está registrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Este email ya está registrado' });
    }

    // Crear un nuevo usuario
    const user = new User({ nombre, email, password });
    await user.save();

    // Crear un JWT
    const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Función para loguear un usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validación
  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Buscar al usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Crear un JWT
    const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Función de ejemplo para la ruta protegida (perfil)
export const protectRoute = (req, res) => {
  res.send('¡Bienvenido al perfil de usuario!');
};
