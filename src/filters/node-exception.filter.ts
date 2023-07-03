import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class NodeInternalServerErrorExceptionFilter implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const responseJson = {
      status,
      timestamp: new Date().toISOString(),
      error: HttpStatus[500],
      messages: [],
    };

    response.status(status).json(responseJson);
  }
}
