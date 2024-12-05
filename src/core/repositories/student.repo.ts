
import { StudentTrainingPayload } from "../entities/StudentTrainingPayload";
import { StudentBaap } from "../entities/student";
import { Teacher } from "../entities/teacher"


export interface IStudentRepository {
    createStudent: (studentPayload: StudentTrainingPayload) => Promise<StudentBaap>;
    getAllStudents(): Promise<StudentBaap[]>;

    getStudentById: (teacherId: string) => Promise<StudentBaap[] | undefined>; 
    
    updateStudent: (uuid: string, studentPayload: StudentTrainingPayload) => Promise<StudentBaap | undefined>;  // Method to update student by ID
    deleteStudent: (uuid: string) => Promise<boolean>;

    getSudentStudent: (teacherId: string) => Promise<StudentBaap[] | undefined>;

}