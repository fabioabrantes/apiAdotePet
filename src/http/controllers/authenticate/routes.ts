import { FastifyInstance } from 'fastify';

import { authenticate } from './authenticateOrgController';
import { refresh } from './refreshToken';


export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);
}