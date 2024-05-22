import { expect, it, describe, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { SearchPetsByFeaturePetUC } from './search-pets-by-feature';

// Precisa criar as variaveis globalmente e tipar
let petsRepository: InMemoryPetsRepository
let orgsRepository = new InMemoryOrgsRepository()
let sut: SearchPetsByFeaturePetUC

describe('Search Pets by features Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();

    // Instanciando o caso de uso
    sut = new SearchPetsByFeaturePetUC(petsRepository);

  });

  it('should be to search for pets at a specific filter', async () => {
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
      city: `Cajazeiras`,
      state: 'SP',
    });
    
    for (let i = 1; i <= 2; i++) {
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
        ]
      })
    }

    const { pets } = await sut.execute({
      city: 'Cajazeiras',
      age: 'PUPPY',
      energyLevel: undefined,
      size: undefined,
    })

    console.log(pets)

    expect(pets).toHaveLength(2)
  })
})