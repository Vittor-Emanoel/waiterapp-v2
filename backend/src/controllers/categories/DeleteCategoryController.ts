
import { makeDeleteCategoryUseCase } from "@/factories/categories/categories.factory";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteCategoryController {
  static async handler(
    request: FastifyRequest<{
      Params: {
        categoryId: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const deleteCategoryUseCase = makeDeleteCategoryUseCase();

    try {
      await deleteCategoryUseCase.execute(request.params.categoryId);

      return reply.status(200).send();
    } catch (error) {
      throw error;
    }
  }
}
