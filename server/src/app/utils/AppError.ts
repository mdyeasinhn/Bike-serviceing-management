class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack?: string) {
    super(message);

    this.name = new.target.name; // Sets the correct class name: AppError
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype); // Ensures instanceof AppError works

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
