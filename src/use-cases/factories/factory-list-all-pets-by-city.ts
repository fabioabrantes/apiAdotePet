import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";

import { ListAllPetsInASpecificCityUC } from "@/use-cases/pets/list-all-pets-by-city-uc";

export function factoryListPetsByCity() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetRepository();
  const listAllPetsInASpecificCityUC = new ListAllPetsInASpecificCityUC(orgsRepository, petsRepository);
  return listAllPetsInASpecificCityUC;
}