import { IStudentRepository } from "@core/repositories/student.repo";
import { StudentTrainingPayload } from "@core/entities/StudentTrainingPayload";
import { StudentBaap } from "@core/entities/student";
import StudentModel from "@infrastructure/database/models/student.model";


export class StudentRepository implements IStudentRepository {
    async createStudent(studentPayload: StudentTrainingPayload): Promise<StudentBaap> {
        const student = await StudentModel.create(studentPayload);
        return student as unknown as StudentBaap;
    };

    async getStudentById(teacherId: string): Promise<StudentBaap[] | undefined> {
        const students = await StudentModel.findAll({
            where: { teacherId },
            raw: true 
        });
        
        return students.length > 0 ? students as StudentBaap[] : undefined;
    }


    async getAllStudents(): Promise<StudentBaap[]> {
        const students = await StudentModel.findAll();
        return students as unknown as StudentBaap[];
    };

    async updateStudent(id: string, studentPayload: StudentTrainingPayload): Promise<StudentBaap | undefined> {
        const student = await StudentModel.findByPk(id);
        if (!student) {
            return undefined;
        }
        await student.update(studentPayload);
        return student as unknown as StudentBaap;
    }

    async deleteStudent(id: string): Promise<boolean> {
        const student = await StudentModel.findByPk(id);
        if (!student) {
            return false;
        }
        await student.destroy();
        return true;
    }

}
