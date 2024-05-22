import { IOrgsRepository } from '@/repositories/interfaceOrgRepository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { Org } from '@prisma/client';
import { compare } from 'bcryptjs';

interface AuthenticateOrgCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgCaseResponse {
  org: Org;
}

export class AuthenticateUC {
  constructor(private orgsRepository: IOrgsRepository) { }

  async execute({ email, password }: AuthenticateOrgCaseRequest): Promise<AuthenticateOrgCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);
    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doestPasswordMatches = await compare(password, org.passwordHash);
    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    }
  }
}