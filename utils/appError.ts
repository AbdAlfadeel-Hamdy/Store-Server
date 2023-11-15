export class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default (message: string, statusCode: number) =>
  new AppError(message, statusCode);
