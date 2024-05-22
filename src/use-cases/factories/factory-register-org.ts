import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterOrgUseCase } from "@/use-cases/orgs/register-org-uc";

export function factoryRegisterOrg() {
  const orgsRepository = new PrismaOrgsRepository();
  const registerOrgUC = new RegisterOrgUseCase(orgsRepository);
  return registerOrgUC;
}