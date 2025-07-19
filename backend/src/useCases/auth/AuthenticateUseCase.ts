import { InvalidCredentialError } from "@/errors/application/InvalidCredentials";
import { UserNotFoundError } from "@/errors/UserNotFoundError";
import type { IUsersRepository } from "@/repositories/IUsersRepository";
import type { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface IAuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface IAuthenticateUseCaseResponse {
	user: User;
}

export class AuthenticateUseCase {
	constructor(private authRepository: IUsersRepository) {}

	async execute({
		email,
		password,
	}: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
		const user = await this.authRepository.findByEmail(email);

		if (!user) {
			throw new UserNotFoundError();
		}

		const doesPasswordMatches = await compare(password, user.password);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialError();
		}

		return {
			user,
		};
	}
}
