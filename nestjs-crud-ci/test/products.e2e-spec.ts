import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (POST)', async () => {
    const res = await (request(app.getHttpServer()) as any)
      .post('/products')
      .send({ name: 'Laptop', price: 1200 })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Laptop');
  });

  it('/products (GET)', async () => {
    const res = await (request(app.getHttpServer()) as any)
      .get('/products')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
