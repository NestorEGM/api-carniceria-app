class InvalidTokenError extends Error {
  constructor(message = 'Invalid token') {
    super(message);
    this.name = 'Invalid Token Error';
    this.message = message;
    this.status = 401;
  }
}

module.exports = InvalidTokenError;