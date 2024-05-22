import { FastifyReply, FastifyRequest } from 'fastify';

import { factoryOrgProfile } from '@/use-cases/factories/factory-org-profile';

export async function profileOrg(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfileUC = factoryOrgProfile();

  const { org } = await getOrgProfileUC.execute({
    orgId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...org,
      passwordHash: undefined,/* retira essa propriedade do objeto */
    },
  });

}