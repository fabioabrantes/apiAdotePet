import { expect, describe, it, beforeEach } from 'vitest';

import { RegisterPetUC } from '@/use-cases/pets/register-pet-uc';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';


let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;

let sut: RegisterPetUC;

describe('Pet Register Use Case', () => {
  beforeEach(async () => {/* aqui inicializa sempre esseas variaveis antes de cada teste. zerando os contextos */
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterPetUC(orgsRepository, petsRepository);

    await orgsRepository.create({
      id: 'org-01',
      title: 'ORG AMIGOS DOS ANIMAIS',
      nameAccountable: 'fabio abrantes diniz',
      address: 'rua joão pessoa, 103',
      city:"uirauna",
      state:"PB",
      whatsapp: '11999999999',
      postalCode: '12345678',
      latitude: -27.2092052,
      longitude: -49.6401091,
      email: 'johndoe@example.com',
      passwordHash: '123456fdgdgfcb',
    });
  });

  it('should be able to register a new pet', async () => {
    const { pet } = await sut.execute({
      id: 'pet-01',
      age: 'PUPPY',
      ambient: 'SMALL',
      description: 'cachorro lindo',
      name: 'bilu',
      independenceLevel: 'LOW',
      size: 'MEDIUM',
      org_id: 'org-01',
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
    });

    expect(pet.id).toEqual(expect.any(String));

  });

  it('should not be able to register with id wrong org', async () => {


    await expect(() =>
      sut.execute({
        id: 'pet-01',
        age: 'PUPPY',
        ambient: 'SMALL',
        description: 'cachorro lindo',
        name: 'bilu',
        independenceLevel: 'LOW',
        size: 'MEDIUM',
        org_id: 'org-02',
        images: [
          {
            id: 'img-01', path: 'path', pet_id: 'pet-01', created_at: new Date(), updated_at: new Date()
          }
        ],
        adoptionRequirements: [
          {
            description: 'kdvkvkc',
          }
        ]
      }),/* usei await no expect pq essa função retorna uma promise */
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});