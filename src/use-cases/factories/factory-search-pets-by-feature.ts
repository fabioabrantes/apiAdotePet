import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";

import { SearchPetsByFeaturePetUC } from "@/use-cases/pets/search-pets-by-feature";

export function factorySearchPetsByFeature() {
  const petsRepository = new PrismaPetRepository();
  const searchPetsByFeatureUC = new SearchPetsByFeaturePetUC(petsRepository);
  return searchPetsByFeatureUC;
}