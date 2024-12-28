import Student from '../models/Student';

export default interface StudentService{
    addStudent(student:Student):boolean;

    deleteStudent(id: number): Student | null;
}