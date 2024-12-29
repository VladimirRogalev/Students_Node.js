import Student from '../models/Student';

export default interface StudentService{
    addStudent(student:Student):boolean;

    deleteStudent(id: number): Student | null;

    getStudent(id: number): Student |null;

    updateStudent(id: number, studentDto: any): Student | null;
}