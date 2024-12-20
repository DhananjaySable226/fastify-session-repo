import 'dotenv/config'
import fp from 'fastify-plugin'
import { type FastifyPluginAsync } from 'fastify'
import { type Static, Type } from '@sinclair/typebox'
import Ajv from 'ajv'

export enum NodeEnv {
    development = 'development',
    test = 'test',
    production = 'production'
}

const ConfigSchema = Type.Strict(
    Type.Object({
        NODE_ENV: Type.Enum(NodeEnv),
        LOG_LEVEL: Type.String(),
        API_HOST: Type.String(),
        API_PORT_AUTH: Type.Number(),
    })
)

const ajv = new Ajv({
    allErrors: true,
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    allowUnionTypes: true
})

export type Config = Static<typeof ConfigSchema>

const authConfigPlugin: FastifyPluginAsync = async (server) => {
    const validate = ajv.compile(ConfigSchema)
    const valid = validate(process.env)
    if (!valid) {
        throw new Error(
            '.env file validation failed - ' +
            JSON.stringify(validate.errors, null, 2)
        )
    }
    server.decorate('authConfig', {
        NODE_ENV: process.env.NODE_ENV as NodeEnv,
        LOG_LEVEL: process.env.LOG_LEVEL as string,
        API_HOST: process.env.API_HOST as string,
        API_PORT_AUTH: Number(process.env.API_PORT_AUTH) as number,
    })
}

declare module 'fastify' {
    interface FastifyInstance {
        authConfig: Config
    }
}

export default fp(authConfigPlugin)