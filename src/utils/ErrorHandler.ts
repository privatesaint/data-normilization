class ErrorHandler extends Error {
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
