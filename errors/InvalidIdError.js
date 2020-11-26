class InvalidIdError extends Error {
  constructor(message, id) {
    super(message);
    this.id = id;
    this.status = 400;
    this.name = 'Invalid Id Error';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidIdError);
    }
  }
}

module.exports = InvalidIdError;