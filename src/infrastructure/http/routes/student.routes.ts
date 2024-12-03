import { type RouteOptions } from 'fastify'
import {
    createStudent,
    //  getStudentById,
    getAllStudents,
    updateStudent,
    deleteStudent
} from '@infrastructure/http/controllers/students.ctrl'
import { type IStudentRepository } from '@core/repositories/student.repo';
import {
    getStudentByID,
    postStudentSchema,
    getAllStudentsSchema,
    updateStudentSchema,
    deleteStudentSchema
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
    // {
    //     method: 'GET',
    //     url: '/studentUser/:id',
    //     schema: getStudentByID,
    //     handler: getStudentById(studentRepository)
    // },

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
])