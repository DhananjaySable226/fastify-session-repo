import { FastifySchema } from "fastify";
import { Static, Type } from "@sinclair/typebox";

const UUID = Type.String({ description: 'Unique identifier' });
const Name = Type.String({ description: 'Name' });
const Email = Type.String({ description: 'Email address' });
const Phone = Type.Integer({ description: 'Phone number' });
const BooleanFlag = Type.Boolean({ description: 'Boolean flag' });
const DateTime = Type.Optional(Type.String({ format: 'date-time', description: 'Date-Time format' }));

export const TeacherSchema = Type.Object({
    teacherId: UUID,
    name: Name,
    email: Email,
    phone: Phone,
    subject: Type.String({ description: 'Subject specialization' }),
    date_of_joining: DateTime,
    is_active: BooleanFlag,
});

export const StudentSchema = Type.Object({
    uuid: UUID,
    name: Name,
    email: Email,
    password: Type.String({ description: 'Password' }),
    phone: Phone,
    enrolled: BooleanFlag,
    teacherId: UUID,
});

export const StudentWithTeacherSchema = Type.Intersect([
    StudentSchema,
    Type.Object({ teacher: TeacherSchema }),
]);

export const StudentPayload = Type.Omit(StudentSchema, ['uuid']);

export const StudentResponse = Type.Partial(StudentSchema);
export const StudentWithTeacherResponse = Type.Partial(StudentWithTeacherSchema);

export const StudentListResponse = Type.Array(StudentResponse, {
    description: 'List of student records',
});
export const StudentWithTeacherListResponse = Type.Array(StudentWithTeacherSchema, {
    description: 'List of students with teacher details',
});

export const NotFoundSchema = Type.Object({
    statusCode: Type.Number({ example: 404 }),
    error: Type.String({ example: 'Not found' }),
    message: Type.String({ example: 'Record not found' }),
});

const StudentParams = Type.Object({
    uuid: UUID,
});
const TeacherParams = Type.Object({
    teacherId: UUID,
});

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

export type StudentParamsType = Static<typeof StudentParams>;
export type TeacherParamsType = Static<typeof TeacherParams>;
