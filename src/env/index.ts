import { config } from 'dotenv';// vai carregar as variaveis dentro do .env
import { z } from 'zod';

if (process.env.NODE_ENV === 'test') { // o vitest possui já essa variavel ambiente
  config({ path: '.env.test' }); // configura com as variaveis ambientes do teste presente no vitest
} else {
  config();
}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;