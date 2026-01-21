export interface AppError extends Error {
  statusCode: number;
}

export class InternalServerError implements AppError {
  statusCode: number;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = 500;
    this.message = message;
    this.name = "InternalServerError";
  }
}

export class NotFoundError implements AppError {
  statusCode: number;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = 404;
    this.message = message;
    this.name = "NotFoundError";
  }
}

export class BadRequestError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    this.statusCode = 400;
    this.message = message;
    this.name = "BadRequestError";
  }
}
export class UnauthorizedError implements AppError {
  statusCode: number;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = 401;
    this.message = message;
    this.name = "UnauthorizedError";
  }
}
export class ForbiddenError implements AppError {
  statusCode: number;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = 403;
    this.message = message;
    this.name = "ForbiddenError";
  }
}
export class ConflictError implements AppError {
  statusCode: number;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = 409;
    this.message = message;
    this.name = "ConflictError";
  }
}

export class UnprocessableEntityError implements AppError {
  statusCode: number;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = 422;
    this.message = message;
    this.name = "UnprocessableEntityError";
  }
}
export class TooManyRequestsError implements AppError {
  statusCode: number;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = 429;
    this.message = message;

    this.name = "TooManyRequestsError";
  }
}

export class ServiceUnavailableError implements AppError {
  statusCode: number;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = 503;
    this.message = message;
    this.name = "ServiceUnavailableError";
  }
}
