import { FastifyInstance } from 'fastify';

import { createOrg } from './createOrgController';
import { profileOrg } from './profileOrg';
//midleware
import { verifyJwt } from '@/http/middlewares/verify-jwt';



export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg);

  /* rotas que serão chamadas quando fizer login */
  app.get('/me', { onRequest: [verifyJwt] }, profileOrg);

}