import StudentService from './StudentService';
import Student from '../models/Student';
import StudentRepository from '../dao/StudentRepository';
import NewStudentDto from '../dto/NewStudentDto';


export default class StudentServiceImpl implements StudentService {
    private studentRepository = new StudentRepository();

    addStudent(student: Student): boolean {
        const students = this.studentRepository.readAll();
        if (students.find(value => value.id === student.id)) {
            console.error(`Student with id: ${student.id} is already exist`);
            return false;
        }
        students.push(student);
        students.sort((a, b) => a.id - b.id);
        this.studentRepository.writeAll(students);
        return true;
    }

    deleteStudent(id: number): Student {
        const students = this.studentRepository.readAll();
        const student = students.find(value => value.id === id);
        if (!student) {
            throw new Error(`Student with id ${id} not found`);
        }
        const updatedStudents = students.filter(value => value.id !==id);
        this.studentRepository.writeAll(updatedStudents);
        return student;
    }

    getStudent(id: number): Student {

        const students = this.studentRepository.readAll();
        const student = students.find(value => value.id === id);
        if (!student) {
            throw new Error(`Student with id ${id} not found`);
        }
        return student;
    }

    updateStudent(id: number, name: string, password: string): NewStudentDto {
        const students = this.studentRepository.readAll();
        const student = students.find(s => s.id === id);
        if (!student) {
            throw new Error(`Student with id ${id} not found`);
        }

        student.name = name;
        student.password = password;
        this.studentRepository.writeAll(students);
        return new NewStudentDto(student.id, student.name, student.password);
    }


    getStudentsByName(name: string): Student[] {
        const students = this.studentRepository.readAll();
        return students.filter(value => value.name.toLowerCase() === name.toLowerCase());

    }


    addScore(id: number, examName: string, score: number): boolean {
        const students: Student[] = this.studentRepository.readAll();
        const index = students.findIndex(s => s.id === id);
        if (index < 0) throw new Error(`Student with id ${id} not found`);
        const student = students[index];
        student.addScore(examName, score);
        students[index] = student;
        this.studentRepository.writeAll(students);
        return true;

    }

    getQuantityStudents(names: string[]): number {
        const students = this.studentRepository.readAll()
        return students.filter(value => names.includes(value.name)).length;
    }

    findStudentsByMinScore(exam: string, minScore: number): Student[] {
        const students = this.studentRepository.readAll()
        return students.filter(value => value.scores.get(exam)!>minScore);
    }


}