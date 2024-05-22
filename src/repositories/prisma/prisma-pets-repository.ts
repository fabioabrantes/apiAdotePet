import { Org, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { IPetRepository,SearchFeatureParams } from '@/repositories/interfacePetRepository';

export class PrismaPetRepository implements IPetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
      include:{
        images:{
          select:{
            path:true
          }
        }
      }
    });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    });

    return pet;
  }
  async findManyPetsByOrgs(orgs:Org[]){
    const pets = await prisma.pet.findMany({
      where:{
        org_id:{
          in:orgs.map((org)=>org.id),
        }
      }
    });
    return pets;
  }

  async findPetsByQueryFeatures({ city, age, energyLevel, size,independenceLevel }: SearchFeatureParams) {
    const query = {
      age,
      energyLevel,
      size,
      independenceLevel,
    }

   const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
        ...query,
      },
    })

    return pets
  }

}
