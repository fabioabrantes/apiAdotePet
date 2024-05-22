import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { AuthenticateUC } from '@/use-cases/orgs/authenticate';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

let usersRepository: InMemoryOrgsRepository;
let sut: AuthenticateUC;

describe('Org Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUC(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      title: 'ORG AMIGOS DOS ANIMAIS',
      nameAccountable: 'fabio abrantes diniz',
      address: 'rua joão pessoa, 103',
      whatsapp: '11999999999',
      postalCode: '12345678',
      latitude: -27.2092052,
      longitude: -49.6401091,
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    });

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      title: 'ORG AMIGOS DOS ANIMAIS',
      nameAccountable: 'fabio abrantes diniz',
      address: 'rua joão pessoa, 103',
      whatsapp: '11999999999',
      postalCode: '12345678',
      latitude: -27.2092052,
      longitude: -49.6401091,
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
})