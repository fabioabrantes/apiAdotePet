import { ZodError } from "zod";
import {FastifyError, FastifyRequest, FastifyReply} from 'fastify';

import { env } from "@/env";

export function verifyErrors(error:FastifyError, request:FastifyRequest, reply:FastifyReply){
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' });
}