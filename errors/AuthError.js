class AuthError extends Error {
  constructor(message = 'Usuario o contraseña incorrectos') {
    super(message);
    this.name = 'Auth Error';
    this.message = message;
    this.status = 400;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }
  }
}

module.exports = AuthError;