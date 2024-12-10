import { FastifyInstance } from 'fastify';
import { loginController, registerController } from './user.controller';
import { loginSchema, registerSchema } from './user.schemas';

export const authRoutes = async (app: FastifyInstance) => {
    app.post('/login', { schema: loginSchema }, loginController);
    app.post('/register', { schema: registerSchema }, registerController);
};