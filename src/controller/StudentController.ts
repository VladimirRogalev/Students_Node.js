import StudentService from '../services/StudentService';
import Student from '../models/Student';


export default class  StudentController{
    private studentService: StudentService;


    constructor(studentService: StudentService) {
        this.studentService = studentService;
    }

    addStudent(studentDto: Student) {
        return this.studentService.addStudent(studentDto as Student)
    }
}