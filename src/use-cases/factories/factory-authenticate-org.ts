import {PrismaOrgsRepository} from '@/repositories/prisma/prisma-orgs-repository';
import {AuthenticateUC} from '@/use-cases/orgs/authenticate';

export function factoryAuthenticateOrg(){
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateUC = new AuthenticateUC(orgsRepository);
  return authenticateUC;
}



