import { FastifyReply, FastifyRequest } from 'fastify';
/* vai buscar o token do cabeçalho e verificar se é valido. 
  Se o token não existir ou errado, dar error.
  Além disso cria e colocar o payload do token na variavel user do request 
*/
export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify(); // verifica se o token é valido com a chave secreta
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' });
  }
}