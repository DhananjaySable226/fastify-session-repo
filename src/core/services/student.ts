import { StudentTrainingPayload } from "../entities/StudentTrainingPayload";
import { StudentBaap } from "../entities/student";
import { IStudentRepository } from "../repositories/student.repo";

interface IStudentService {
    createStudent: (studentTrainingPayload: StudentTrainingPayload) => Promise<StudentBaap>;
    // getStudent: (uuid: string) => Promise<StudentBaap | undefined>;
    getAllStudents: () => Promise<StudentBaap[]>;

}

export const StudentService = (
    studentRepository: IStudentRepository
): IStudentService => ({
    createStudent: async (studentPayload: StudentTrainingPayload): Promise<StudentBaap> => {
        return await studentRepository.createStudent(studentPayload);
    },
    getAllStudents: async (): Promise<StudentBaap[]> => {
        return await studentRepository.getAllStudents();
    }
});