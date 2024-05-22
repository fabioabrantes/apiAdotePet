import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";

import { DetailPetUC } from "@/use-cases/pets/detail-pet-uc";

export function factoryDetailPet() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetRepository();
  const detailPetUC = new DetailPetUC(petsRepository, orgsRepository);
  return detailPetUC;
}