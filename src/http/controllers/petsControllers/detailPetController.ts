import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { factoryDetailPet } from '@/use-cases/factories/factory-detail-pet';

export async function detailPetController(request: FastifyRequest, response: FastifyReply) {
  const getSpecificPetParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getSpecificPetParamsSchema.parse(request.params);

  try {
    const objDetailPetUC = factoryDetailPet();

    const { pet,org } = await objDetailPetUC.execute({ petId: id });

    response.status(200).send({ pet,org });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(409).send({
        message: err.message,
      })
    }
    // Retornando um erro genérico
    throw err;
  }
}