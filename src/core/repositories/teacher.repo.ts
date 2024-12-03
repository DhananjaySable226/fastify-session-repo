
import { TeacherTrainingPayload } from "../entities/teacher.payload";
import { Teacher } from "../entities/teacher";

export interface ITeacherRepository {
     createTeacher: (TeacherPayload: TeacherTrainingPayload) => Promise<Teacher>;
     getAllTeachers(): Promise<Teacher[]>;
    // getStudent: (uuid: string) => Promise<Teacher | undefined>;
    // getStudentById: (id: string) => Promise<Teacher | undefined>;  // Method to get a student by ID
    updateTeacher: (id: string, TeacherPayload: TeacherTrainingPayload) => Promise<Teacher | undefined>;  // Method to update student by ID
    deleteTeacher: (id: string) => Promise<boolean>;
}
