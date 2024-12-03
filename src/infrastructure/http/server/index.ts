import fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify'
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import routes from '@infrastructure/http/routes';
import cors from "@fastify/cors";
import docs from '@infrastructure/http/plugins/docs'
import config from '@infrastructure/http/plugins/config'
import sequelize from '@infrastructure/database/index'
import { StudentRepository } from '@infrastructure/repositories/student.repo';
import { TeacherRepository } from '@infrastructure/repositories/teacher.repo';


export const createServer = async (): Promise<FastifyInstance> => {
    const envToLogger: any = {
        development: {
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname'
                }
            }
        },
        production: true,
        test: false
    }

    const environment = process.env.NODE_ENV ?? 'production'
    await sequelize.sync()
    const serverOptions: FastifyServerOptions = {
        ajv: {
            customOptions: {
                removeAdditional: 'all',
                coerceTypes: true,
                useDefaults: true,
                keywords: ['kind', 'modifier']
            }
        },
        logger: envToLogger[environment] ?? true
    }

    const server = fastify(serverOptions).withTypeProvider<TypeBoxTypeProvider>()

    server.register(cors, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });

    server.get("/", async (request, reply) => {
        reply.send({ message: "Welcome to the TEAI service" });
    });

    await server.register(docs)
    await server.register(config)

    // Initialize the student repository
    const studentRepository = new StudentRepository()
    const teacherRepository = new TeacherRepository();


    const studentRoutes1 = routes(
        studentRepository,
        teacherRepository
    );

    studentRoutes1.forEach((route) => {
        server.route(route);
    });
    await server.ready()
    return server
}
