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

export const studentRoutes = (studentRepository: IStudentRepository): RouteOptions[] => ([
    {
        method: 'POST',
        url: '/studentUser',
        schema: postStudentSchema,
        handler: createStudent(studentRepository)
    },
    {
        method: 'GET',
        url: '/students',
        schema: getAllStudentsSchema,
        handler: getAllStudents(studentRepository)
    },
    {
        method: 'GET',
        url: '/studentUser/:teacherId',
        schema: getStudentByID,
        handler: getStudentById(studentRepository)
    },

    {
        method: 'PUT',
        url: '/studentUser/:uuid',
        schema: updateStudentSchema,
        handler: updateStudent(studentRepository),
    },
    {
        method: 'DELETE',
        url: '/studentUser/:uuid',
        schema: deleteStudentSchema,
        handler: deleteStudent(studentRepository),
    },
    
    {
        method: 'GET',
        url: '/getstudentbyid/:teacherId',
        schema: StudentWithTeacherListResponse,
        handler: getSudentStudent(studentRepository),
    },
])
