import { Org, Prisma } from "@prisma/client";
import { IOrgsRepository } from "../interfaceOrgRepository";
import { randomUUID } from 'node:crypto';

export class InMemoryOrgsRepository implements IOrgsRepository {
  public orgs: Org[] = [];

  async findById(id: string) {
    const foundedOrg = this.orgs.find((org) => org.id === id);

    if (!foundedOrg) {
      return null;
    }

    return foundedOrg;
  }
  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email);
    if (!org) {
      return null;
    }

    return org;

  }
  async findByCity(city: string) {
    const orgs = this.orgs.filter((org) => org.city.toLowerCase() === city.toLowerCase());
    return orgs;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      title: data.title,
      nameAccountable: data.nameAccountable,
      email: data.email,
      passwordHash: data.passwordHash,
      postalCode: data.postalCode,
      city:data.city,
      state:data.state,
      address: data.address,
      whatsapp: data.whatsapp,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.orgs.push(org);

    return org;
  }

}