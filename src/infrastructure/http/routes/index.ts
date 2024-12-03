import { type RouteOptions } from 'fastify'
import { IStudentRepository } from "@core/repositories/student.repo";
import { studentRoutes } from "@infrastructure/http/routes/student.routes";

import { ITeacherRepository } from "@core/repositories/teacher.repo";
import { teacherRoutes } from "@infrastructure/http/routes/teacher.router";


export default (
    studentRepository: IStudentRepository,
    teacherRepository: ITeacherRepository,

): RouteOptions[] => ([
    ...studentRoutes(studentRepository),
    ...teacherRoutes(teacherRepository)
])