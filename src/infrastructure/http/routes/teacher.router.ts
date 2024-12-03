import { type RouteOptions } from 'fastify'
import {
    createTeacher,
    getAllTeachers,
    updateTeacher,
    deleteTeacher
} from '@infrastructure/http/controllers/teacher.ctrl'
import { type ITeacherRepository } from '@core/repositories/teacher.repo'

export const teacherRoutes = (teacherRepository: ITeacherRepository): RouteOptions[] => ([
    {
        method: 'POST',
        url: '/Teacher',
        handler: createTeacher(teacherRepository)
    },
    {
        method: 'GET',
        url: '/Teachers', 
        handler: getAllTeachers(teacherRepository)
    },
    {
        method: 'PUT',
        url: '/Teacher/:id',
        handler: updateTeacher(teacherRepository),
    },
    {
        method: 'DELETE',
        url: '/Teacher/:id', 
        handler: deleteTeacher(teacherRepository),
    },
])
