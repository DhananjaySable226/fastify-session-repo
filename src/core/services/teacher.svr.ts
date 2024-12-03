import { TeacherTrainingPayload } from "../entities/teacher.payload";
import { Teacher } from "../entities/teacher";
import { ITeacherRepository } from "../repositories/teacher.repo";

interface ITeacherService {
    createTeacher: (TeacherTrainingPayload: TeacherTrainingPayload) => Promise<Teacher>;
    getAllTeachers: () => Promise<Teacher[]>;
    updateTeacher: (id: string, teacherPayload: TeacherTrainingPayload) => Promise<Teacher | undefined>;
    deleteTeacher: (id: string) => Promise<boolean>;

}

export const TeacherService = (
    TeacherRepository: ITeacherRepository
): ITeacherService => ({
    createTeacher: async (teacherPayload: TeacherTrainingPayload): Promise<Teacher> => {
        return await TeacherRepository.createTeacher(teacherPayload);
    },
    getAllTeachers: async (): Promise<Teacher[]> => {
        return await TeacherRepository.getAllTeachers();
    },
    updateTeacher: async (id: string, teacherPayload: TeacherTrainingPayload): Promise<Teacher | undefined> => {
        return await TeacherRepository.updateTeacher(id, teacherPayload);
    },
    deleteTeacher: async (id: string): Promise<boolean> => {
        return await TeacherRepository.deleteTeacher(id);
    }
});