import StudentService from './StudentService';
import Student from '../models/Student';
import StudentRepository from '../dao/StudentRepository';

export default class StudentServiceImpl implements StudentService{
    private studentRepository = new StudentRepository();

    addStudent(student: Student): boolean {
        const students = this.studentRepository.readAll();
        if(students.find(value => value.id===student.id)){
            console.error(`Student with id: ${student.id} is already exist`)
            return false;
        }
        students.push(student)
        return this.studentRepository.writeAll(students);
    }

    deleteStudent(id: number): Student | null {
        const students = this.studentRepository.readAll();
        const index = students.findIndex(value => value.id===id);
        if (index===-1) {
            return null;
        }
        const [deleteStudent] = students.splice(index,1);
        this.studentRepository.writeAll(students)
        return deleteStudent;
    }

    getStudent(id: number): Student | null {

        const students = this.studentRepository.readAll();
        const student = students.find(value => value.id===id);
        if (!student) {
            return null;
        }
        return student;
    }

}