import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { factoryAuthenticateOrg } from '@/use-cases/factories/factory-authenticate-org';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);
  try {
    const authenticateUC = factoryAuthenticateOrg();
    const { org } = await authenticateUC.execute({
      email,
      password
    });

    const token = await reply.jwtSign({},
      {
        sign: {
          sub: org.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    );

    return reply
      .setCookie('refreshToken', refreshToken, {/* usamos o cookie para evitar que seja acessado pela requisição do frontend ou usuário final */
        path: '/',/* quais rotas da nossa aplicação vai ter acesso a esse cookie*/
        secure: true,/* nosso cookie vai ser encriptado pelo nosso https. nosso frontend não vai conseguir nosso cookie */
        sameSite: true,/* só vai ser acessível dentro do mesmo domínio */
        httpOnly: true,/* nosso cookie só vai ser acessível pelo nosso backend da requisição e resposta. e não pelo frontend. não vai ficar salvo dentro do browser */
      })
      .status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}