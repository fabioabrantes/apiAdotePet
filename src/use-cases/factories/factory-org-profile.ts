import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetOrgProfileUseCase } from "@/use-cases/orgs/get-org-profile";

export function factoryOrgProfile() {
  const orgsRepository = new PrismaOrgsRepository();
  const OrgProfileUC = new GetOrgProfileUseCase(orgsRepository);
  return OrgProfileUC;
}