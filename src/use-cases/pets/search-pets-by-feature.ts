import { IPetRepository } from '@/repositories/interfacePetRepository'
import { Age,IndependenceLevel, Pet, Size } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface SearchPetsByFeatureRequest {
  city: string;
  age?: Age;
  energyLevel?: "LOW" | "MEDIUM" | "HIGH" ;
  size?: Size;
  independenceLevel?: IndependenceLevel;
}

type SearchPetsByFeatureResponse = {
  pets: Pet[]
}

export class SearchPetsByFeaturePetUC {
  constructor(private petsRepository: IPetRepository) { }

  async execute( data: SearchPetsByFeatureRequest): Promise<SearchPetsByFeatureResponse> {
    const pets = await this.petsRepository.findPetsByQueryFeatures(data);

    if(pets.length === 0) {
      throw new ResourceNotFoundError();
    }
    
    return {
      pets,
    }
  }
}