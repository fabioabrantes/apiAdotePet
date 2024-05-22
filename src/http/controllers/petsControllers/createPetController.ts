import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error';
import { factoryRegisterPet } from '@/use-cases/factories/factory-register-pet';


export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    age: z.enum(["PUPPY", "ADULT", "SENIOR"]),
    ambient: z.enum(["SMALL", "MEDIUM", "BIG", "GIANT"]),
    independenceLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
    size: z.enum(["SMALL", "MEDIUM", "BIG", "GIANT"]),
    adoptionRequirements: z.string().transform((val, ctx) => {
      const parsed = JSON.parse(val);
      if (parsed.length <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "not requirements information",
        });
        return z.NEVER;
      }
      return parsed;
    })
  });
  const { name, description, age, ambient, independenceLevel, size, adoptionRequirements } = registerBodySchema.parse(request.body);


  const images = request.files;
  if (images.length <= 0) {
    return reply
      .status(400)
      .send({ error: 'É necessário no mínimo 1 imagem do pet' });
  }
  const imagePath = images.map(img => { return { path: img.filename! } });
  try {
    const objRegisterPetUC = factoryRegisterPet();
    const pet = await objRegisterPetUC.execute({
      name,
      age,
      ambient,
      independenceLevel,
      size,
      adoptionRequirements,
      description,
      org_id: request.user.sub,
      images: imagePath,
    });

    return reply.status(201).send({ pet });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error;
  }

}