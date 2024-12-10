import { FastifyReply, FastifyRequest } from 'fastify';

export const verifyJwt = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify(); // Verify the JWT
    } catch (err) {
        reply.code(401).send({ message: 'Unauthorized' }); // Handle verification failure
    }
};

export default verifyJwt;