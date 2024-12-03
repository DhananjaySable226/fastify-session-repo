
import { StudentTrainingPayload } from "../entities/StudentTrainingPayload";
import { StudentBaap } from "../entities/student";

export interface IStudentRepository {
    createStudent: (studentPayload: StudentTrainingPayload) => Promise<StudentBaap>;
    getAllStudents(): Promise<StudentBaap[]>;
    // getStudent: (uuid: string) => Promise<StudentBaap | undefined>;
    // getStudentById: (id: string) => Promise<StudentBaap | undefined>;  // Method to get a student by ID
    updateStudent: (id: string, studentPayload: StudentTrainingPayload) => Promise<StudentBaap | undefined>;  // Method to update student by ID
    deleteStudent: (id: string) => Promise<boolean>;
}
