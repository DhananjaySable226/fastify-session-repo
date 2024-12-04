import { type Teacher } from '../entities/teacher';


export type TeacherTrainingPayload = Omit<Teacher, 'teacherId'>;