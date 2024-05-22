import { Prisma, Pet, Org, Age, Size, IndependenceLevel } from '@prisma/client'

export interface SearchFeatureParams {
  city: string;
  age?: Age;
  energyLevel?: "LOW" | "MEDIUM" | "HIGH";
  size?: Size;
  independenceLevel?: IndependenceLevel;
}
export interface IPetRepository {
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findManyPetsByOrgs(orgs: Org[]): Promise<Pet[]>;
  findPetsByQueryFeatures(data: SearchFeatureParams): Promise<Pet[]>
}