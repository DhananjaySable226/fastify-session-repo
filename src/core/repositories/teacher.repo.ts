
import { TeacherTrainingPayload } from "../entities/teacher.payload";
import { Teacher } from "../entities/teacher";

export interface ITeacherRepository {
     createTeacher: (TeacherPayload: TeacherTrainingPayload) => Promise<Teacher>;
     getAllTeachers(): Promise<Teacher[]>;
    // getStudent: (teacherId: string) => Promise<Teacher | undefined>;
    // getStudentById: (teacherId: string) => Promise<Teacher | undefined>;  // Method to get a student by ID
    updateTeacher: (teacherId: string, TeacherPayload: TeacherTrainingPayload) => Promise<Teacher | undefined>;  // Method to update student by ID
    deleteTeacher: (teacherId: string) => Promise<boolean>;
}
