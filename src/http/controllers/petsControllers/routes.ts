import { FastifyInstance } from 'fastify';
import multer from 'fastify-multer';

import { createPet } from './createPetController';
import { listAllPetsByCity } from './listAllPetsByCity';
//midleware
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import uploadConfig from '@/http/config/upload';
import { searchPetsByFeatureController } from './searchPetsByFeatureController';
import { detailPetController } from './detailPetController';


const upload = multer(uploadConfig.upload("uploads"));
export async function petsRoutes(app: FastifyInstance) {

  app.get('/pets/:city', listAllPetsByCity);
  app.get('/pet/:id', detailPetController);

  app.get('/search/:city', searchPetsByFeatureController);

  /* rotas que serão chamadas quando fizer login pela org*/
  app.post('/pets', { onRequest: [verifyJwt], preHandler: upload.array('images') }, createPet);

}