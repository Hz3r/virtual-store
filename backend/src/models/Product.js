import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  subCategoria: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  configuracion: {
    type: String,
    required: true,
  },
  disponible: {
    type: Boolean,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  popular: {
    type: Boolean,
    required: true,
  },
  caracteristicas: {
    duracion: {
      type: String,
      required: true,
    },
    membresia: {
      type: String,
      required: true,
    },
    calidad: {
      type: String,
      required: true,
    },
    pantallas: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: false,
    },
    contrasena: {
      type: String,
      required: false,
    },
    tipo: {
      type: String,
      required: true,
    },
    soporte: {
      type: String,
      required: true,
    },
  },
});

const Product = mongoose.model('Product', productSchema)

export default Product;