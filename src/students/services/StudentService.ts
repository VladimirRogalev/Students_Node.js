import Student from '../models/Student';
import NewStudentDto from '../dto/NewStudentDto';

export default interface StudentService{
    addStudent(student:Student):boolean;

    deleteStudent(id: number): Student;

    getStudent(id: number): Student;

    updateStudent(id: number, name: string, password: string): NewStudentDto ;

    getStudentsByName(name: string): Student[];

    addScore(id: number, examName: string, score: number): boolean;

    getQuantityStudents(names: string[]): number;

    findStudentsByMinScore(exam: string, minScore: number):Student [] ;
}