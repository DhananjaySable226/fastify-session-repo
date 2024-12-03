import { type Teacher } from '../entities/teacher';


export type TeacherTrainingPayload = Omit<Teacher, 'uuid'>;