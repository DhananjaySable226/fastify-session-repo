import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './user.services';

export const registerController = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, password } = request.body as { username: string; password: string };
    try {
        const token = await AuthService.register(username, password);
        reply.send({ message: 'User registered successfully'});
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message // If the error is an instance of Error
                : 'An unexpected error occurred';
        reply.code(400).send({ message: errorMessage });
    }
};

export const loginController = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, password } = request.body as { username: string; password: string };
    try {
        const token = await AuthService.login(username, password);
        reply.send({ token });
    } catch (error) {
        reply.code(401).send({ message: error});
    }
};