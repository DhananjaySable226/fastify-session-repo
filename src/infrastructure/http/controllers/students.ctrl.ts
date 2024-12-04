import type { IStudentRepository } from "@core/repositories/student.repo";
import type { FastifyReply, FastifyRequest } from "fastify";
import { StudentService } from "@core/services/student";
import type { StudentTrainingPayload } from "@core/entities/StudentTrainingPayload";

export const createStudent = (
    studentRepository: IStudentRepository
) => async function (request: FastifyRequest, reply: FastifyReply) {
    try {
        const payload = request.body as StudentTrainingPayload;

        console.log("Payload received:", payload);

        const student = await StudentService(studentRepository)
            .createStudent(payload);


        console.log("Student created:", student);

        void reply.status(201).send(student);

    } catch (error) {
        void reply.status(500).send({ error: 'Internal Server Error' });
    }
};

export const getAllStudents = (studentRepository: IStudentRepository) =>
    async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            const students = await studentRepository.getAllStudents();
            return reply.status(200).send(students);

        } catch (error) {
            return reply.status(500).send({ error: 'Failed to fetch students' });
        }
    };


export const updateStudent = (studentRepository: IStudentRepository) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        const { uuid } = request.params as { uuid: string };
        const studentPayload = request.body as StudentTrainingPayload;

        const updatedStudent = await studentRepository.updateStudent(uuid, studentPayload);

        if (updatedStudent) {
            reply.send(updatedStudent);
        } else {
            reply.status(404).send({ message: "Student not found" });
        }
    };

export const deleteStudent = (studentRepository: IStudentRepository) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        const { uuid } = request.params as { uuid: string };

        const isDeleted = await studentRepository.deleteStudent(uuid);

        if (isDeleted) {
            reply.status(200).send({ message: "Student deleted successfully" });
        } else {
            reply.status(404).send({ message: "Student not found" });
        }
    };


export const getStudentById = (studentRepository: IStudentRepository) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        const { teacherId } = request.params as { teacherId: string };

        try {
            const students = await studentRepository.getStudentById(teacherId);

            if (students && students.length > 0) {
                return reply.status(200).send(students);
            } else {
                return reply.status(404).send({ message: 'No students found for this teacher' });
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            return reply.status(500).send({ message: 'Internal server error' });
        }
    };