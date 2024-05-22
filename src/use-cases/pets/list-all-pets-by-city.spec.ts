import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { hash } from 'bcryptjs';
import { ListAllPetsInASpecificCityUC} from './list-all-pets-by-city-uc';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: ListAllPetsInASpecificCityUC;

describe('Search lista of pets by city Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()

    sut = new ListAllPetsInASpecificCityUC(orgsRepository, petsRepository,);
  })

  it('should be able to list all pets by city', async () => {

    for (let index = 0; index < 5; index++) {
      const org = await orgsRepository.create({
        title: `ORG ${index} AMIGOS DOS ANIMAIS`,
        nameAccountable: 'fabio abrantes diniz',
        address: 'rua joão pessoa, 103',
        whatsapp: '11999999999',
        postalCode: '12345678',
        latitude: -27.2092052,
        longitude: -49.6401091,
        email: 'johndoe@example.com',
        passwordHash: await hash('123456', 6),
        city: `Cajazeiras${index}`,
        state: 'SP',
      });
      for (let index = 0; index < 3; index++) {
        petsRepository.create({
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
        });

      }
    }


    const { pets } = await sut.execute({ city: 'Cajazeiras0' })

    expect(pets).toHaveLength(3);
  })
})