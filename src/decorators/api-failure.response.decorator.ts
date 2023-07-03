import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiResponse } from '@nestjs/swagger';

export const ApiFailureResponse = (
  statusCode: ErrorHttpStatusCode,
  messageExample: string,
) => {
  return applyDecorators(
    ApiResponse({
      status: statusCode,
      schema: {
        properties: {
          statusCode: {
            type: 'number',
            format: 'integer',
            example: statusCode,
          },
          timestamp: {
            type: 'date',
            format: 'date-time',
            example: new Date(),
          },
          path: {
            type: 'string',
            example: 'api/posts/1',
          },
          error: {
            type: 'string',
            example: HttpStatus[statusCode],
          },
          messages: {
            type: 'array',
            example: [messageExample],
          },
        },
      },
    }),
  );
};
