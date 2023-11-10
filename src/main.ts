import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const prefix = config.get('API_PREFIX');
  const port = config.get('APP_PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  SwaggerConfig(app, '1');
  await app.listen(port);
}
bootstrap().then(() => {
  Logger.log(`Application is running on port ${process.env.APP_PORT}`);
});
