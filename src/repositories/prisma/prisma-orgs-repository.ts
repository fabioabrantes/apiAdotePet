import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { IOrgsRepository } from '@/repositories/interfaceOrgRepository';

export class PrismaOrgsRepository implements IOrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }
  async findByCity(city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
    });
    return orgs;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}