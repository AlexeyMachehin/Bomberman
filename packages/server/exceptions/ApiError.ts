export class ApiError extends Error {
  status;
  errors;

  constructor(status: any, message: any, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static BadRequest(message: any, errors = []) {
    return new ApiError(400, message, errors);
  }
}
