import { Pet } from '@prisma/client';

import { IOrgsRepository } from '@/repositories/interfaceOrgRepository';
import { IPetRepository } from '@/repositories/interfacePetRepository';

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface listAllPetsByCityRequest {
  city: string;
}

interface listAllPetsByCityResponse {
  pets: Pet[];
}

export class ListAllPetsInASpecificCityUC {
  constructor(
    private orgRepository: IOrgsRepository,
    private petRepository: IPetRepository
  ) { }

  async execute({ city }: listAllPetsByCityRequest): Promise<listAllPetsByCityResponse> {
    const orgs = await this.orgRepository.findByCity(city);

    if (orgs.length === 0) {
      console.log(orgs);
      throw new ResourceNotFoundError();
    }

    const pets = await this.petRepository.findManyPetsByOrgs(orgs);
    if (pets.length === 0) {
      throw new ResourceNotFoundError();
    }

    return {
      pets
    }

  }
}