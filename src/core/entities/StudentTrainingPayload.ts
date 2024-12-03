import { type StudentBaap } from '../entities/student';


export type StudentTrainingPayload = Omit<StudentBaap, 'uuid'>;