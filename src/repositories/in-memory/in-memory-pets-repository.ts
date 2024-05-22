import { Org, Pet, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { IPetRepository, SearchFeatureParams } from '@/repositories/interfacePetRepository';

export class InMemoryPetsRepository implements IPetRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const newPet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ? data.description : null,
      age: data.age,
      size: data.size,
      created_at: new Date(),
      independenceLevel: data.independenceLevel,
      org_id: data.org_id,
      ambient: data.ambient,
      images: data.images,
      adoptionRequirements: data.adoptionRequirements,
      updated_at: new Date(),
      energyLevel: data.energyLevel!,
    }

    this.pets.push(newPet);

    return newPet;
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findManyPetsByOrgs(orgs: Org[]) {
    const orgIds = orgs.map((org) => org.id);

    const petsCity = this.pets.filter(pet => orgIds.includes(pet.org_id));

    return petsCity;
  }

  async findPetsByQueryFeatures({ age, energyLevel, size, independenceLevel }: SearchFeatureParams) {
    let petsFiltered = this.pets;

    if (energyLevel) {
      petsFiltered = this.pets.filter((pet) => pet.energyLevel === energyLevel);
    }

    if (age) {
      petsFiltered = this.pets.filter((item) => item.age === age);
    }

    if (size) {
      petsFiltered = this.pets.filter((item) => item.size === size);
    }

    if (independenceLevel) {
      petsFiltered = this.pets.filter((item) => item.independenceLevel === independenceLevel);
    }

    return petsFiltered
  }


}