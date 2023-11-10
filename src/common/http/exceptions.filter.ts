import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { DbErrorType } from '../enums/db-error.type.enum';

@Catch(HttpException, QueryFailedError, EntityNotFoundError, TypeORMError)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(protected readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    if (exception.code) {
      switch (exception.code) {
        case DbErrorType.CHECK_CONSTRAINT:
          httpAdapter.reply(
            response,
            {
              statusCode: 400,
              method: request.method,
              path: request.url,
              time: new Date().getTime(),
              message: exception.message,
            },
            500,
          );
          break;
        case DbErrorType.NOT_NULL_CONSTRAINT:
          httpAdapter.reply(
            response,
            {
              statusCode: 400,
              method: request.method,
              path: request.url,
              time: new Date().getTime(),
              message: exception.message,
            },
            500,
          );
          break;
        case DbErrorType.FOREIGN_KEY_CONSTRAINT:
          httpAdapter.reply(
            response,
            {
              statusCode: 400,
              method: request.method,
              path: request.url,
              time: new Date().getTime(),
              message: exception.message,
            },
            500,
          );
          break;
        case DbErrorType.MISSING_COLUMN:
          httpAdapter.reply(
            response,
            {
              statusCode: 400,
              method: request.method,
              path: request.url,
              time: new Date().getTime(),
              message: exception.message,
            },
            500,
          );
          break;
        case DbErrorType.UNIQUE_CONSTRAINT:
          httpAdapter.reply(
            response,
            {
              statusCode: 400,
              method: request.method,
              path: request.url,
              time: new Date().getTime(),
              message: exception.detail,
            },
            500,
          );
          console.log(exception);
          break;
      }
    } else {
      httpAdapter.reply(
        response,
        {
          statusCode: 400,
          method: request.method,
          path: request.url,
          time: new Date().getTime(),
          message: exception.response.message
            ? exception.response.message
            : exception.message,
        },
        400,
      );
    }
  }
}
