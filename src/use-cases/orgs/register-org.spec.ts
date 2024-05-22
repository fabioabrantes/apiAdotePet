import { compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

import { RegisterOrgUseCase } from './register-org-uc';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error';


let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterOrgUseCase;

describe('Org Register Use Case', () => {
  beforeEach(() => {/* aqui inicializa sempre esseas variaveis antes de cada teste. zerando os contextos */
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterOrgUseCase(orgsRepository);
  });

  it('should to register an org', async () => {
    const { org } = await sut.execute({
      title: 'ORG AMIGOS DOS ANIMAIS',
      nameAccountable: 'fabio abrantes diniz',
      address: 'rua joão pessoa, 103',
      whatsapp: '11999999999',
      postalCode: '12345678',
      latitude: -27.2092052,
      longitude: -49.6401091,
      email: 'johndoe@example.com',
      password: '123456',
      city: 'São Paulo',
      state: 'SP',
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org.address).toEqual(expect.any(String));
    expect(org.whatsapp).toEqual(expect.any(String));
  });

  it('should to do hash org password upon registration', async () => {
    const { org } = await sut.execute({
      title: 'ORG AMIGOS DOS ANIMAIS',
      nameAccountable: 'fabio abrantes diniz',
      address: 'rua joão pessoa, 103',
      whatsapp: '11999999999',
      postalCode: '12345678',
      latitude: -27.2092052,
      longitude: -49.6401091,
      email: 'johndoe@example.com',
      password: '123456',
      city: 'São Paulo',
      state: 'SP',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      org.passwordHash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {

    const email = 'johndoe@example.com';

    await sut.execute({
      title: 'ORG AMIGOS DOS ANIMAIS',
      nameAccountable: 'fabio abrantes diniz',
      address: 'rua joão pessoa, 103',
      whatsapp: '11999999999',
      postalCode: '12345678',
      latitude: -27.2092052,
      longitude: -49.6401091,
      email,
      password: '123456',
      city: 'São Paulo',
      state: 'SP',
    });

    await expect(() =>
      sut.execute({
        title: 'ORG AMIGOS DOS ANIMAIS',
        nameAccountable: 'fabio abrantes diniz',
        address: 'rua joão pessoa, 103',
        whatsapp: '11999999999',
        postalCode: '12345678',
        latitude: -27.2092052,
        longitude: -49.6401091,
        email,
        password: '123456',
        city: 'São Paulo',
        state: 'SP',
      }),/* usei await no expect pq essa função retorna uma promise */
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});