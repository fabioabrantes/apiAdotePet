import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error';
import { factoryRegisterOrg } from '@/use-cases/factories/factory-register-org';

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    nameAccountable: z.string(),
    postalCode: z.string(),
    city:z.string(),
    state:z.string(),
    address: z.string(),
    whatsapp: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  });

  const {
    title,
    email,
    password,
    nameAccountable,
    postalCode,
    city,
    state,
    address,
    whatsapp,
    latitude,
    longitude
  } = registerBodySchema.parse(request.body);

  try {
    const objRegisterOrgUC = factoryRegisterOrg();
    await objRegisterOrgUC.execute({
      title,
      email,
      password,
      nameAccountable,
      postalCode,
      city,
      state,
      address,
      latitude,
      longitude,
      whatsapp
    });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error;
  }

  return reply.status(201).send();
}