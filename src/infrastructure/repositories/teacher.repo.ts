import { ITeacherRepository } from "@core/repositories/teacher.repo";
import { TeacherTrainingPayload } from "@core/entities/teacher.payload";
import { Teacher } from "@core/entities/teacher";
import TeacherModel from "@infrastructure/database/models/teacher.model";

export class TeacherRepository implements ITeacherRepository {

    async createTeacher(teacherPayload: TeacherTrainingPayload): Promise<Teacher> {
        const Teacher = await TeacherModel.create(teacherPayload);
        return Teacher as unknown as Teacher;
    };

    async getAllTeachers(): Promise<Teacher[]> {
        const Teachers = await TeacherModel.findAll();
        return Teachers as unknown as Teacher[];
    };


    async updateTeacher(id: string, teacherPayload: TeacherTrainingPayload): Promise<Teacher | undefined> {
        const Teacher = await TeacherModel.findByPk(id);
        if (!Teacher) {
            return undefined;
        }
        await Teacher.update(teacherPayload);
        return Teacher as unknown as Teacher;
    }

    async deleteTeacher(id: string): Promise<boolean> {
        const Teacher = await TeacherModel.findByPk(id);
        if (!Teacher) {
            return false;
        }
        await Teacher.destroy();
        return true;
    }

}
