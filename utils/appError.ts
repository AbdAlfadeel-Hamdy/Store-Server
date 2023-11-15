export default class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createAppError = (message: string, statusCode: number) => {
  throw new AppError(message, statusCode);
};
