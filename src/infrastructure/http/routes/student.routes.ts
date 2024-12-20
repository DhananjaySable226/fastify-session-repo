import { type RouteOptions } from 'fastify'
import {
    createStudent,
     getStudentById,
    getAllStudents,
    updateStudent,
    deleteStudent,
    getSudentStudent
} from '@infrastructure/http/controllers/students.ctrl'
import { type IStudentRepository } from '@core/repositories/student.repo';
import {
    getStudentByID,
    postStudentSchema,
    getAllStudentsSchema,
    updateStudentSchema,
    deleteStudentSchema,
    StudentWithTeacherListResponse
} from "@infrastructure/http/schemas/student.schema"
import verifyJwt from "@infrastructure/middleware/auth/veryfy.jwt";

export const studentRoutes = (studentRepository: IStudentRepository): RouteOptions[] => ([
    {
        method: 'POST',
        url: '/studentUser',
        schema: postStudentSchema,
        preHandler: verifyJwt,
        handler: createStudent(studentRepository)
    },
    {
        method: 'GET',
        url: '/students',
        schema: getAllStudentsSchema,
        preHandler: verifyJwt,
        handler: getAllStudents(studentRepository)
    },
    {
        method: 'GET',
        url: '/studentUser/:teacherId',
        schema: getStudentByID,
        preHandler: verifyJwt,
        handler: getStudentById(studentRepository)
    },

    {
        method: 'PUT',
        url: '/studentUser/:uuid',
        schema: updateStudentSchema,
        preHandler: verifyJwt,
        handler: updateStudent(studentRepository),
    },
    {
        method: 'DELETE',
        url: '/studentUser/:uuid',
        schema: deleteStudentSchema,
        preHandler: verifyJwt,
        handler: deleteStudent(studentRepository),
    },
    
    {
        method: 'GET',
        url: '/getstudentbyid/:teacherId',
        schema: StudentWithTeacherListResponse,
        preHandler: verifyJwt,
        handler: getSudentStudent(studentRepository),
    },
])
