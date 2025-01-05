import StudentService from '../services/StudentService';
import Student from '../models/Student';


export default class  StudentController{
    private studentService: StudentService;


    constructor(studentService: StudentService) {
        this.studentService = studentService;
    }

    async addStudent(studentDto: Student) {
        return this.studentService.addStudent(studentDto as Student)
    }

    async deleteStudent (id: number) {
        return this.studentService.deleteStudent(id);
    }

    async getStudent(id: number) {
        return this.studentService.getStudent(id);
    }

    updateStudent(id: number, studentDto: any) {
        return this.studentService.updateStudent(id, studentDto);
    }

    async getQuantityStudents() {
        return this.studentService.getQuantityStudents()
    }

     getStudentsByName(name: string) {
        return this.studentService.getStudentsByName(name)
    }


     getAverageScoreByExam(exam: string) {
        return this.studentService.getAverageScoreByExam(exam)
}
}