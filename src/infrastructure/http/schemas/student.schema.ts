// import {FastifySchema} from "fastify";
// import {Static, Type} from "@sinclair/typebox";

// export const TeacherSchema = Type.Object({
//     teacherId: Type.String({ description: 'Unique ID of the teacher' }),
//     name: Type.String({ description: 'Name of the teacher' }),
//     email: Type.String({ description: 'Email address of the teacher' }),
//     phone: Type.Integer({ description: 'Phone number of the teacher' }),
//     subject: Type.String({ description: 'Subject specialization of the teacher' }),
//     date_of_joining: Type.Optional(Type.String({ format: 'date-time', description: 'Date of joining' })),
//     is_active: Type.Boolean({ description: 'Active status of the teacher' }),
// });


// export const StudentSchema = Type.Object({
//     uuid: Type.String({ description: 'Unique ID of the student' }),
//     name: Type.String({ description: 'Name of the student' }),
//     email: Type.String({ description: 'Email address of the student' }),
//     password: Type.String({ description: 'Password of the student' }),
//     phone: Type.Integer({ description: 'Phone number of the student' }),
//     enrolled: Type.Boolean({ description: 'Enrollment status of the student' }),
//     teacherId: Type.String({ description: 'Associated teacher ID' }),
// });

// export const StudentWithTeacherSchema = Type.Object({
//     ...StudentSchema.properties,
//     teacher: TeacherSchema,
// });


// export const StudentPayload = Type.Object({
//     name: Type.String(),
//     email: Type.String(),
//     password: Type.String(),
//     phone:Type.Integer(),
//     enrolled:Type.Boolean(),
//     teacherId:Type.String(),
// });


// export const StudentResponse = Type.Object({
//     uuid: Type.Optional(Type.String()),
//     name: Type.Optional(Type.String()),
//     email: Type.Optional(Type.String()),
//     password: Type.Optional(Type.String()),
//     phone: Type.Optional(Type.Integer()),
//     enrolled: Type.Optional(Type.Boolean()),
//     teacherId: Type.Optional(Type.String()),
// });

// export const StudentResponse1 = Type.Object({
//     uuid: Type.Optional(Type.String()),
//     name: Type.Optional(Type.String()),
//     email: Type.Optional(Type.String()),
//     password: Type.Optional(Type.String()),
//     phone: Type.Optional(Type.Integer()),
//     enrolled: Type.Optional(Type.Boolean()),
//     teacherId: Type.Optional(Type.String()),
// });
// export const postStudentSchema: FastifySchema = {
//     description: 'Create a new Student',
//     // tags: ['Student'],
//     summary: 'Creates a new student',
//     body: StudentPayload,
//     response: {
//         201: { ...StudentResponse, description: 'Success' },
//     },
// };

// export const notFoundSchema = Type.Object({
//     statusCode: Type.Number({ example: 404 }),
//     error: Type.String({ example: 'Not found' }),
//     message: Type.String({ example: 'Student record not found in database' })
// })

// const StudentParams = Type.Object({
//     uuid: Type.String({ description: 'Student Id' }),
// })
// const StudentParams1 = Type.Object({
//     teacherId: Type.String({ description: 'Teacher Id' }),
// })

// export const getStudentByID: FastifySchema = {
//     description: 'Gets all students for a teacher',
//     tags: ['Student'],
//     summary: 'Gets students by teacherId',
//     params: StudentParams1,
//     response: {
//         200: Type.Array(StudentResponse),
//         404: { ...notFoundSchema, description: 'Not found' },
//     },
// };

// export const getAllStudentsSchema: FastifySchema = {
//     description: 'Get all Students',
//     summary: 'Fetch all student records',
//     response: {
//         200: Type.Array(StudentResponse),
//     },
// };

// export const deleteStudentSchema: FastifySchema = {
//     description: 'Delete a Student',
//     summary: 'Delete student by Id',
//     params: StudentParams,
//     response: {
//         200: {
//             type: 'object',
//             properties: {
//                 message: { type: 'string', example: 'Student deleted successfully' },
//             },
//         },
//         404: { ...notFoundSchema, description: 'Student not found' },
//     },
// };
// export const StudentWithTeacherListResponse = Type.Array(StudentWithTeacherSchema, {
//     description: 'List of students with their teacher details',
// });


// export const updateStudentSchema: FastifySchema = {
//     description: 'Update a Student',
//     summary: 'Update student details by Id',
//     params: StudentParams,
//     body: StudentPayload,
//     response: {
//         200: { ...StudentResponse, description: 'Student updated successfully' },
//         404: { ...notFoundSchema, description: 'Student not found' },
//     },
// };

// export type StudentParamsType = Static<typeof StudentParams>;

import { FastifySchema } from "fastify";
import { Static, Type } from "@sinclair/typebox";

// Common schema types for reusability
const UUID = Type.String({ description: 'Unique identifier' });
const Name = Type.String({ description: 'Name' });
const Email = Type.String({ description: 'Email address' });
const Phone = Type.Integer({ description: 'Phone number' });
const BooleanFlag = Type.Boolean({ description: 'Boolean flag' });
const DateTime = Type.Optional(Type.String({ format: 'date-time', description: 'Date-Time format' }));

// Teacher schema
export const TeacherSchema = Type.Object({
    teacherId: UUID,
    name: Name,
    email: Email,
    phone: Phone,
    subject: Type.String({ description: 'Subject specialization' }),
    date_of_joining: DateTime,
    is_active: BooleanFlag,
});

// Student schema
export const StudentSchema = Type.Object({
    uuid: UUID,
    name: Name,
    email: Email,
    password: Type.String({ description: 'Password' }),
    phone: Phone,
    enrolled: BooleanFlag,
    teacherId: UUID,
});

// Student with Teacher schema
export const StudentWithTeacherSchema = Type.Intersect([
    StudentSchema,
    Type.Object({ teacher: TeacherSchema }),
]);

// Student payload schema for requests
export const StudentPayload = Type.Omit(StudentSchema, ['uuid']);

// Common response schema
export const StudentResponse = Type.Partial(StudentSchema);
export const StudentWithTeacherResponse = Type.Partial(StudentWithTeacherSchema);

// Array response schemas
export const StudentListResponse = Type.Array(StudentResponse, {
    description: 'List of student records',
});
export const StudentWithTeacherListResponse = Type.Array(StudentWithTeacherSchema, {
    description: 'List of students with teacher details',
});

// Not found schema for consistent error handling
export const NotFoundSchema = Type.Object({
    statusCode: Type.Number({ example: 404 }),
    error: Type.String({ example: 'Not found' }),
    message: Type.String({ example: 'Record not found' }),
});

// Parameter schemas
const StudentParams = Type.Object({
    uuid: UUID,
});
const TeacherParams = Type.Object({
    teacherId: UUID,
});

// Schemas for individual routes
export const postStudentSchema: FastifySchema = {
    description: 'Create a new student',
    summary: 'Creates a student record',
    body: StudentPayload,
    response: {
        201: { ...StudentResponse, description: 'Student created successfully' },
    },
};

export const getAllStudentsSchema: FastifySchema = {
    description: 'Fetch all students',
    summary: 'Gets all student records',
    response: {
        200: StudentListResponse,
    },
};

export const getStudentByID: FastifySchema = {
    description: 'Fetch students by teacher ID',
    summary: 'Gets all students linked to a teacher',
    params: TeacherParams,
    response: {
        200: StudentListResponse,
        404: { ...NotFoundSchema, description: 'No students found for this teacher' },
    },
};

export const deleteStudentSchema: FastifySchema = {
    description: 'Delete a student',
    summary: 'Removes a student record by ID',
    params: StudentParams,
    response: {
        200: Type.Object({
            message: Type.String({ example: 'Student deleted successfully' }),
        }),
        404: { ...NotFoundSchema, description: 'Student not found' },
    },
};

export const updateStudentSchema: FastifySchema = {
    description: 'Update a student',
    summary: 'Modifies a student record by ID',
    params: StudentParams,
    body: StudentPayload,
    response: {
        200: { ...StudentResponse, description: 'Student updated successfully' },
        404: { ...NotFoundSchema, description: 'Student not found' },
    },
};

export const getStudentWithTeacherSchema: FastifySchema = {
    description: 'Fetch students with teacher details',
    summary: 'Gets students and their associated teacher details',
    params: TeacherParams,
    response: {
        200: StudentWithTeacherListResponse,
        404: { ...NotFoundSchema, description: 'No students found for this teacher' },
    },
};

// TypeScript type for route parameters
export type StudentParamsType = Static<typeof StudentParams>;
export type TeacherParamsType = Static<typeof TeacherParams>;
