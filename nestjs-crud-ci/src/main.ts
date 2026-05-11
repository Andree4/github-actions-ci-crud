import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  // Log and exit on unhandled bootstrap errors
  // Keeps lint happy by handling the returned promise
  // and ensures process exits with non-zero status on failure

  console.error(err);
  process.exit(1);
});
