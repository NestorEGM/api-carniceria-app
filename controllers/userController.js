const { createUserService, loginService, getUsersService, getUserService, updateUserService, deleteUserService } = require('../services/userService');
const { InvalidFieldsError, UnknownError, InvalidIdError, AuthError } = require('../errors');

const createUserController = async (req, res) => {
  try {
    const user = req.body;
    const { user: newUser } = await createUserService(user);
    res.json({
      ok: true,
      user: newUser,
    });
  } catch (error) {
    if (error instanceof InvalidFieldsError) {
      return res.status(error.status).json({
        ok: false,
        message: error.message,
        errors: error.messageFields,
      });
    }
    if (error instanceof UnknownError) {
      return res.status(error.status).json({
        ok: false,
        message: error.message,
        error: error.unknownError,
      });
    }
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = req.body;
    const { user: loggedUser } = await loginService(user);
    res.json({
      ok: true,
      user: loggedUser,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.status).json({
        ok: false,
        error: error.message,
      });
    }
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const getUsersController = async (req, res) => {
  try {
    let from = req.query.from || null;
    from = Number(from);
    let limit = req.query.limit || null;
    limit = Number(limit);
    const fields = req.body.fields || null;
    const { users } = await getUsersService(from, limit, fields);
    res.json({
      ok: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const { user } = await getUserService(id);
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    if (error instanceof InvalidIdError) {
      return res.status(error.status).json({
        ok: false,
        error: error.message,
        id: error.id,
      });
    }
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
};

const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const fields = req.body;
    const { user } = await updateUserService(id, fields);
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    if (error instanceof InvalidFieldsError) {
      return res.status(error.status).json({
        ok: false,
        message: error.message,
        errors: error.messageFields,
      });
    }
    if (error instanceof InvalidIdError) {
      return res.status(error.status).json({
        ok: false,
        error: error.message,
        id: error.id,
      });
    }
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const { user } = await deleteUserService(id);
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    if (error instanceof InvalidIdError) {
      return res.status(error.status).json({
        ok: false,
        error: error.message,
        id: error.id,
      });
    }
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

module.exports = {
  createUserController,
  loginController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
};