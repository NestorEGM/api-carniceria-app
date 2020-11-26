const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { validateName, VALID_ROLES } = require('../utils');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    validate: [validateName, 'Solo se permiten letras'],
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es requerido'],
    validate: [validateName, 'Solo se permiten letras'],
  },
  email: {
    type: String,
    required: [true, 'El correo es requerido'],
    unique: true,
    validate: [isEmail, 'El correo no es valido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
  },
  phones: {
    type: [String],
  },
  addresses: {
    type: [String],
  },
  role: {
    type: String,
    enum: VALID_ROLES,
    default: 'USER_ROLE',
  },
  state: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.deletedAt;
  return userObject;
};

userSchema.plugin(uniqueValidator, { message: 'El correo ya existe, por favor ingrese uno diferenete' });
module.exports = mongoose.model('user', userSchema);