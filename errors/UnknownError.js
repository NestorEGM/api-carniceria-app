class UnknownError extends Error {
  constructor(message, unknownError) {
    super(message);
    this.name = 'Unknown Error';
    this.status = 500;
    this.unknownError = unknownError;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnknownError);
    }
  }
}

module.exports = UnknownError;