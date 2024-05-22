import { hash } from 'bcryptjs';
import { Org } from '@prisma/client';

import { IOrgsRepository } from '@/repositories/interfaceOrgRepository';
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error';

interface createOrgParamsType {
  title: string;
  nameAccountable: string;
  email: string;
  password: string;
  postalCode: string;
  city: string;
  state:string;
  address: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
}

interface createOrgUCResponseType {
  org: Org
}
export class RegisterOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) { }

  async execute({
    title,
    nameAccountable,
    email,
    password,
    postalCode,
    city,
    state,
    address,
    whatsapp,
    latitude,
    longitude,
  }: createOrgParamsType): Promise<createOrgUCResponseType> {

    const passwordHash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }


    const org = await this.orgsRepository.create({
      title,
      nameAccountable,
      email,
      postalCode,
      city,
      state,
      address,
      whatsapp,
      latitude,
      longitude,
      passwordHash,
    });

    return { org };
  }
}
