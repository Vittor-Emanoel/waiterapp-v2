import { makeGetPresignedUrlUseCase } from "@/factories/uploads/makeGetPresignedUrlUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";

const schema = z.object({
  fileName: z.string().min(1),
});

export class GetPresignedUrlController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { fileName } = schema.parse(request.body);

    const fileKey = `${randomUUID()}-${fileName}`;

    const getPresignedUrlUseCase = makeGetPresignedUrlUseCase();

    try {
      const presignedUrl = await getPresignedUrlUseCase.execute(fileKey);

      return reply.status(200).send({ presignedUrl });
    } catch (error) {
      throw error;
    }
  }
}
