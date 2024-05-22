import { hash } from 'bcryptjs';
import { Pet, Size, Age, IndependenceLevel, Ambient } from '@prisma/client';

import { IPetRepository } from '@/repositories/interfacePetRepository';
import { IOrgsRepository } from '@/repositories/interfaceOrgRepository';

import { ResourceNotFoundError } from '../errors/resource-not-found-error';


export interface createPetParamsType {
  id?: string;
  name: string;
  description?: string;
  age: Age;
  ambient: Ambient;
  independenceLevel: IndependenceLevel;
  size: Size;
  org_id: string;
  images: {
    id?: string;
    path:string;
    pet_id?:string;
    created_at?:Date;
    updated_at?:Date;
  }[];
  adoptionRequirements: {
    description: string;
  }[];
}

interface createPetResponseType {
  pet: Pet;
}

export class RegisterPetUC {
  constructor(
    private orgsRepository: IOrgsRepository,
    private petsRepository: IPetRepository
  ) { }

  async execute({
    name,
    description,
    age,
    ambient,
    independenceLevel,
    size,
    org_id,
    images,
    adoptionRequirements
  }: createPetParamsType): Promise<createPetResponseType> {

    // Verificando se a ORG existe
    const org = await this.orgsRepository.findById(org_id);
    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      ambient,
      independenceLevel,
      size,
      images: {
        create: [...images]
      },
      adoptionRequirements: {
        create: [...adoptionRequirements]
      },
      org_id
    });

    return { pet };
  }
}
