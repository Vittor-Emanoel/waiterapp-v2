import "@fastify/jwt";

interface JwtPayload {
	sub: string;
	iat?: number;
	exp?: number;
}

declare module "@fastify/jwt" {
	interface FastifyJWT {
		user: JwtPayload;
	}
}
