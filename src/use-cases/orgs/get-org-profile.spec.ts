import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetOrgProfileUseCase } from '@/use-cases/orgs/get-org-profile';
import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository);
  })

  it('should be able to get user profile', async () => {
    const createdORG = await orgsRepository.create({
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
      orgId: createdORG.id,
    });

    expect(org.nameAccountable).toEqual('fabio abrantes diniz');
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  })
})