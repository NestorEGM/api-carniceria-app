const { isEmail } = require('validator');
const { createUserRepo, loginRepo, getUsersRepo, getUserRepo, updateUserRepo, deleteUserRepo } = require('../repository/userRepository');
const { validateName, handleError } = require('../utils');
const { InvalidFieldsError, UnknownError, InvalidIdError } = require('../errors');

const createUserService = async (user) => {
  try {
    let validatedUser = null;
    let errors = null;
    if (!user.name) {
      errors = {
        name: {
          message: 'El nombre es requerido',
        }
      };
    } else {
      validatedUser = {
        name: user.name.trim(),
      };
      if (!validateName(validatedUser.name)) {
        errors = {
          ...errors,
          name: {
            message: 'El nombre es invalido, solo se permiten letras',
          }
        };
      }
    }
    if (!user.lastName) {
      errors = {
        ...errors,
        lastName: {
          message: 'El apellido es requerido',
        }
      };
    } else {
      validatedUser = {
        ...validatedUser,
        lastName: user.lastName.trim(),
      };
      if (!validateName(validatedUser.lastName)) {
        errors = {
          ...errors,
          lastName: {
            message: 'El apellido es invalido, solo se permiten letras'
          }
        };
      }
    }
    if (!user.email) {
      errors = {
        ...errors,
        email: {
          message: 'El correo es requerido',
        }
      };
    } else {
      validatedUser = {
        ...validatedUser,
        email: user.email.trim(),
      };
      if (!isEmail(validatedUser.email)) {
        errors = {
          ...errors,
          email: {
            message: 'El correo es invalido'
          }
        };
      }
    }
    if (!user.password) {
      errors = {
        ...errors,
        password: 'La contraseña es requerida',
      };
    } else {
      validatedUser = {
        ...validatedUser,
        password: user.password,
      };
      if (user.password.length < 8) {
        errors = {
          ...errors,
          password: {
            message: 'La contraseña debe contener como minimo 8 caracteres',
          },
        };
      }
    }
    if (errors) {
      throw { errors };
    }
    const resp = await createUserRepo(validatedUser);
    return {
      user: resp,
    };
  } catch (error) {
    if (error.errors) {
      const errors = handleError(error.errors);
      throw new InvalidFieldsError('Campos invalidos', errors);
    }
    throw new UnknownError('Error desconocido', error.message);
  }
};

const loginService = async ({ email, password }) => {
  try {
    const resp = await loginRepo({ email, password });
    return {
      user: resp,
    };
  } catch (error) {
    throw error;
  }
};

const getUsersService = async (from, limit, fields) => {
  try {
    const resp = await getUsersRepo(from, limit, fields);
    return {
      users: resp
    };
  } catch (error) {
    throw error;
  }
};

const getUserService = async id => {
  try {
    const resp = await getUserRepo(id);
    return {
      user: resp,
    }
  } catch (error) {
    if (error.name === 'CastError') {
      throw new InvalidIdError('El id no existe', id);
    }
    throw error;
  }
};

const updateUserService = async (id, fields) => {
  try {
    const resp = await updateUserRepo(id, fields);
    if (!resp) {
      throw new InvalidIdError('El id no existe', id);
    }
    return {
      user: resp,
    }
  } catch (error) {
    throw error;
  }
};

const deleteUserService = async id => {
  try {
    const resp = await deleteUserRepo(id);
    return {
      user: resp,
    }
  } catch (error) {
    if (error.name === 'CastError') {
      throw new InvalidIdError('El id no existe', id);
    }
    throw error;
  }
};

module.exports = {
  createUserService,
  loginService,
  getUsersService,
  getUserService,
  updateUserService,
  deleteUserService,
};