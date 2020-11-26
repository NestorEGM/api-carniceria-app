class InvalidFieldsError extends Error {
  constructor(message = '', messageFields) {
    super(message);
    this.name = 'Invalid Fields Error';
    this.messageFields = messageFields;
    this.status = 400;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidFieldsError);
    }
  }
}

module.exports = InvalidFieldsError;