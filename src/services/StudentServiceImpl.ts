import StudentService from './StudentService';
import Student from '../models/Student';
import StudentRepository from '../dao/StudentRepository';


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
        return this.studentRepository.writeAll(students);
    }

    deleteStudent(id: number): Student | null {
        const students = this.studentRepository.readAll();
        const index = students.findIndex(value => value.id === id);
        if (index === -1) {
            return null;
        }
        const [deleteStudent] = students.splice(index, 1);
        this.studentRepository.writeAll(students);
        return deleteStudent;
    }

    getStudent(id: number): Student | null {

        const students = this.studentRepository.readAll();
        const student = students.find(value => value.id === id);
        if (!student) {
            return null;
        }
        return student;
    }

    updateStudent(id: number, studentDto: any): Student | null {
        const students = this.studentRepository.readAll();
        const student = students.find(value => value.id === id);
        if (!student) {
            return null;
        }
        if (studentDto.scores) {
            student.scores = studentDto.scores;
        }
        this.studentRepository.writeAll(students);
        return student;
    }

    getQuantityStudents(): number {
        const students = this.studentRepository.readAll().length;
        return students;
    }

    getStudentsByName(name: string): number {
        const students = this.studentRepository.readAll();
        return students.filter(value => value.name === name).length;

    }

    getAverageScoreByExam(exam: string): number {
        const students = this.studentRepository.readAll();
        if (!students || students.length === 0) {
            throw new Error('No students found to calculate the average');
        }
        let totalScore = 0;


        for (const student of students) {

            switch (exam.toLowerCase()) {
                case 'math':
                    totalScore += student.scores.math;
                    break;
                case 'eng':
                    totalScore += student.scores.eng;
                    break;
                case 'art':
                    totalScore += student.scores.art;
                    break;
                default:
                    throw new Error(`Invalid exam name: ${exam}`);
            }
        }
        return totalScore / students.length;
    }


}