import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { factoryListPetsByCity } from '@/use-cases/factories/factory-list-all-pets-by-city';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';


export async function listAllPetsByCity(request: FastifyRequest, reply: FastifyReply) {
  const listAllPetsByCityParamsSchema = z.object({
    city: z.string(),
  });
  const { city } = listAllPetsByCityParamsSchema.parse(request.params);

  try {
    const objListAllPetsByCityUC = factoryListPetsByCity();
    const {pets} = await objListAllPetsByCityUC.execute({city});

    return reply.status(200).send({ pets });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error;
  }

}