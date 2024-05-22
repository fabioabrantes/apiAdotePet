import { FastifyReply, FastifyRequest } from 'fastify';

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // verifica se no cookie tem o token refresh e valida ou não (se não expirou). ele não verifica no header por que deve ter expirado. 
  await request.jwtVerify({ onlyCookie: true });/* adiciona no request o user.sub e verifica se tem um refreshToken no cookie */

// sendo valido o refresh token. cria um novo token e um novo refresh token
  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200).send({ token });
}