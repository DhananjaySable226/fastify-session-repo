import {FastifySchema} from "fastify";
import {Static, Type} from "@sinclair/typebox";

export const StudentPayload = Type.Object({
    name: Type.String(),
    email: Type.String(),
    password: Type.String(),
    phone:Type.Integer(),
    enrolled:Type.Boolean(),
    teacherId:Type.String()

});

export const StudentResponse = Type.Object({
    uuid: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    password: Type.Optional(Type.String()),
    phone: Type.Optional(Type.Integer()),
    enrolled: Type.Optional(Type.Boolean()),
    teacherId: Type.Optional(Type.String()),
});

export const postStudentSchema: FastifySchema = {
    description: 'Create a new Student',
    // tags: ['Student'],
    summary: 'Creates a new student',
    body: StudentPayload,
    response: {
        201: { ...StudentResponse, description: 'Success' },
    },
};

export const notFoundSchema = Type.Object({
    statusCode: Type.Number({ example: 404 }),
    error: Type.String({ example: 'Not found' }),
    message: Type.String({ example: 'Student record not found in database' })
})

const StudentParams = Type.Object({
    uuid: Type.String({ description: 'Student Id' }),
})
const StudentParams1 = Type.Object({
    teacherId: Type.String({ description: 'Teacher Id' }),
})

export const getStudentByID: FastifySchema = {
    description: 'Gets all students for a teacher',
    tags: ['Student'],
    summary: 'Gets students by teacherId',
    params: StudentParams1,
    response: {
        200: Type.Array(StudentResponse),
        404: { ...notFoundSchema, description: 'Not found' },
    },
};

export const getAllStudentsSchema: FastifySchema = {
    description: 'Get all Students',
    summary: 'Fetch all student records',
    response: {
        200: Type.Array(StudentResponse),
    },
};

export const deleteStudentSchema: FastifySchema = {
    description: 'Delete a Student',
    summary: 'Delete student by Id',
    params: StudentParams,
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Student deleted successfully' },
            },
        },
        404: { ...notFoundSchema, description: 'Student not found' },
    },
};


export const updateStudentSchema: FastifySchema = {
    description: 'Update a Student',
    summary: 'Update student details by Id',
    params: StudentParams,
    body: StudentPayload,
    response: {
        200: { ...StudentResponse, description: 'Student updated successfully' },
        404: { ...notFoundSchema, description: 'Student not found' },
    },
};

export type StudentParamsType = Static<typeof StudentParams>;