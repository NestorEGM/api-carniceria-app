const bcrypt = require('bcrypt');
const { validateFieldsExists } = require('../utils');
const UserModel = require('../models/user');
const { InvalidFieldsError } = require('../errors');

const SALT_ROUNDS = process.env.SALT_ROUNDS;

const createUserRepo = async ({ name, lastName, email, password }) => {
  const cryptedPass = bcrypt.hashSync(password, SALT_ROUNDS);
  const user = new UserModel({
    name,
    lastName,
    email,
    password: cryptedPass,
  });
  const newUser = await user.save();
  return newUser;
};

// NOTE Throws error when receives a negative value in from field
const getUsersRepo = async (from = 0, limit = 0, fields = '') => {
  const users = await UserModel.find({ state: true }, fields)
    .skip(from)
    .limit(limit)
    .exec();
  return users;
};

const getUserRepo = async id => {
  const user = await UserModel.findById(id).exec();
  return user;
};

const updateUserRepo = async (id, fields) => {
  const modelFields = Object.keys(UserModel.schema.path);
  const wrongFields = validateFieldsExists(modelFields, Object.keys(fields));
  if (wrongFields.length) {
    throw new InvalidFieldsError('Los campos no existen', wrongFields);
  }
  const newFields = {
    ...fields,
    updatedAt: Date.now(),
  };
  const user = await UserModel.findByIdAndUpdate(id, newFields, { new: true, runValidators: true, context: 'query' }).exec();
  return user;
};

const deleteUserRepo = async id => {
  const user = await UserModel.findByIdAndUpdate(id, { state: false }, { new: true, runValidators: true, context: 'query' }).exec();
  return user;
};

module.exports = {
  createUserRepo,
  getUsersRepo,
  getUserRepo,
  updateUserRepo,
  deleteUserRepo,
};