import { IPetRepository } from '@/repositories/interfacePetRepository';
import { IOrgsRepository } from '@/repositories/interfaceOrgRepository';

import { Pet, Org } from '@prisma/client'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface GetSpecificPetUCRequest {
  petId: string;
}

interface GetSpecificPetUCResponse {
  pet: Pet;
  org: Org | null;
}

export class DetailPetUC {
  constructor(
    private petsRepository: IPetRepository,
    private orgsRepository: IOrgsRepository
  ) { }

  async execute({ petId, }: GetSpecificPetUCRequest): Promise<GetSpecificPetUCResponse> {
    const pet = await this.petsRepository.findById(petId);
    if (!pet) {
      throw new ResourceNotFoundError();
    }
    const org = await this.orgsRepository.findById(pet.org_id);
   
    return {
      pet,
      org,
    }
  }
}