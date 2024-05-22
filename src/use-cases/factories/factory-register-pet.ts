import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";

import { RegisterPetUC } from "@/use-cases/pets/register-pet-uc";

export function factoryRegisterPet() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetRepository();
  const registerPetUC = new RegisterPetUC(orgsRepository, petsRepository);
  return registerPetUC;
}