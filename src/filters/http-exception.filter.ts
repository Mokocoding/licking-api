import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const err: any = exception.getResponse();
    let errorMessage = [];

    if (Array.isArray(err.message)) {
      errorMessage = err.message;
    } else {
      errorMessage = [err.message];
    }

    const responseJson = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: HttpStatus[status],
      messages: errorMessage,
    };

    response.status(status).json(responseJson);
  }
}
