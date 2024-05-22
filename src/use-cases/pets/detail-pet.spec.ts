import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';

import { DetailPetUC } from './detail-pet-uc';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: DetailPetUC;

describe('DEtail a Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()

    // Instanciando o caso de uso
    sut = new DetailPetUC(petsRepository, orgsRepository);

  });

  it('should be to get specific pet by petId', async () => {
    const org = await orgsRepository.create({
      title: `ORG AMIGOS DOS ANIMAIS`,
      nameAccountable: 'fabio abrantes diniz',
      address: 'rua joão pessoa, 103',
      whatsapp: '11999999999',
      postalCode: '12345678',
      latitude: -27.2092052,
      longitude: -49.6401091,
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      city: `Cajazeiras$`,
      state: 'SP',
    })
    // CRIA o PET
    const newPet = await petsRepository.create({
      id: 'pet-01',
      age: 'PUPPY',
      ambient: 'SMALL',
      description: 'cachorro lindo',
      name: 'bilu',
      independenceLevel: 'LOW',
      size: 'MEDIUM',
      org_id: org.id,
      images: [
        {
          id: 'img-01', path: 'path', pet_id: 'pet-01', created_at: new Date(), updated_at: new Date()
        }
      ],
      adoptionRequirements: [
        {
          description: 'kdvkvkc'
        }
      ],
    })

    const { pet } = await sut.execute({
      petId: newPet.id,
    })

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual('bilu');
    expect(pet.org_id).toEqual(org.id);
  })

  it('should not be to get specific pet by invalid petID', async () => {
    const org = await orgsRepository.create({
      title: `ORG AMIGOS DOS ANIMAIS`,
      nameAccountable: 'fabio abrantes diniz',
      address: 'rua joão pessoa, 103',
      whatsapp: '11999999999',
      postalCode: '12345678',
      latitude: -27.2092052,
      longitude: -49.6401091,
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      city: `Cajazeiras$`,
      state: 'SP',
    })
    // CRIA o PET
    await petsRepository.create({
      id: 'pet-01',
      age: 'PUPPY',
      ambient: 'SMALL',
      description: 'cachorro lindo',
      name: 'bilu',
      independenceLevel: 'LOW',
      size: 'MEDIUM',
      org_id: org.id,
      images: [
        {
          id: 'img-01', path: 'path', pet_id: 'pet-01', created_at: new Date(), updated_at: new Date()
        }
      ],
      adoptionRequirements: [
        {
          description: 'kdvkvkc'
        }
      ],
    })
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  })
})