import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from '@fastify/cookie';
import multer from 'fastify-multer';
import cors from '@fastify/cors';
import path from 'node:path';

import { env } from "@/env";

//rotas
/* import { petsRoutes } from '@/http/controllers/petsControllers/routes'; */
import { orgsRoutes } from '@/http/controllers/orgsControllers/routes';
import { authRoutes } from "./http/controllers/authenticate/routes";
import { petsRoutes } from "./http/controllers/petsControllers/routes";

//middleware
import { verifyErrors } from "@/http/middlewares/verify-errors";


export const app = fastify();
app.register(cors);

app.register(fastifyJwt, {/* depois que registramos o jwt. fica disponíveis os métodos e o nome do cookie dele no request e response */
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken', /* nome do nosso cookie */
    signed: false,/* set para o cookie não ser assinado. não vamos fazer hash nesse projeto */
  },
  sign: {
    expiresIn: '10m',
  },
});
app.register(multer.contentParser);
app.register(fastifyCookie);
/* app.register(petsRoutes); */
app.register(orgsRoutes);
app.register(authRoutes);
app.register(petsRoutes);

app.setErrorHandler(verifyErrors);

app.register(require('@fastify/static'), {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/images/',
});