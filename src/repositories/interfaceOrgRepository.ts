import { Org,Prisma, } from '@prisma/client'

export interface IOrgsRepository {
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findByCity(city: string): Promise<Org[]>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}