import { HttpException } from '@nestjs/common';
import { CustomError } from './CustomError';

export class ErrorException extends HttpException {
  constructor(error: CustomError) {
    super({ ...error }, error.statusCode);
  }
}
