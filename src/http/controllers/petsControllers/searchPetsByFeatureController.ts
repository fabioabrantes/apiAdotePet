import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { factorySearchPetsByFeature } from '@/use-cases/factories/factory-search-pets-by-feature';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function searchPetsByFeatureController(request: FastifyRequest, response: FastifyReply,) {
  const searchPetsParamsSchema = z.object({
    city: z.string(),
  })

  const searchPetsQuerySchema = z.object({
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG','GIANT']).optional(),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional()
  })

  const { city } = searchPetsParamsSchema.parse(request.params)
  const { age, energyLevel, size,independenceLevel } = searchPetsQuerySchema.parse(request.query)

  try {
    const searchPetsUseCase = factorySearchPetsByFeature();

    const { pets } = await searchPetsUseCase.execute({
      city,
      age: age,
      energyLevel: energyLevel,
      size: size,
      independenceLevel:independenceLevel
    })

    return response.status(200).send({ pets });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(409).send({
        message: err.message,
      })
    }
    throw err;
  }
}