import type { ITeacherRepository } from "@core/repositories/teacher.repo";
import type { FastifyReply, FastifyRequest } from "fastify";
import { TeacherService } from "@core/services/teacher.svr";
import type { TeacherTrainingPayload } from "@core/entities/teacher.payload";

export const createTeacher = (
    TeacherRepository: ITeacherRepository
  ) => async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      console.log('Received Payload:', request.body);
      const Teacher = await TeacherService(TeacherRepository)
        .createTeacher(request.body as TeacherTrainingPayload);
      console.log('Created Teacher:', Teacher); 
      void reply.status(201).send(Teacher);
    } catch (error) {
      console.error('Error:', error); 
      void reply.status(500).send({ error: 'Internal Server Error' });
    }
  };
  

export const getAllTeachers = (TeacherRepository: ITeacherRepository) =>
    async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            const Teachers = await TeacherRepository.getAllTeachers();
            return reply.status(200).send(Teachers);

        } catch (error) {
            return reply.status(500).send({ error: 'Failed to fetch Teachers' });
        }
    };


    export const updateTeacher = (
        TeacherRepository: ITeacherRepository
    ) => async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            const { teacherId } = request.params as { teacherId: string };
            const updatedTeacher = await TeacherService(TeacherRepository)
                .updateTeacher(teacherId, request.body as TeacherTrainingPayload);
    
            if (!updatedTeacher) {
                return reply.status(404).send({ error: 'Teacher not found' });
            }
    
            return reply.status(200).send(updatedTeacher);
        } catch (error) {
            console.error('Error updating teacher:', error);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    };
    
    export const deleteTeacher = (
        TeacherRepository: ITeacherRepository
    ) => async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            const { teacherId } = request.params as { teacherId: string };
            const deleted = await TeacherService(TeacherRepository).deleteTeacher(teacherId);
    
            if (!deleted) {
                return reply.status(404).send({ error: 'Teacher not found' });
            }
    
            return reply.status(200).send({ message: 'Teacher deleted successfully' });
        } catch (error) {
            console.error('Error deleting teacher:', error);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    };