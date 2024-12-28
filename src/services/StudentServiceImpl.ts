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

}