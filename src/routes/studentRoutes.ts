import {Router} from 'express';
import StudentController from '../controller/StudentController';
import StudentServiceImpl from '../services/StudentServiceImpl';
import {body, query} from 'express-validator';
import validationMiddleware from '../middleware/validationMiddleware';
import asyncHandler from 'express-async-handler';


const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);
router.post('/student',
    body('id').isInt(),
    body('name').isString(),
    body('scores').isObject(),

    validationMiddleware, (req, res) => {
        const studentDto = req.body;
        const isSuccess = studentController.addStudent(studentDto);
        if (isSuccess) {
            res.status(200).send('Okay');
        } else {
            res.status(404).send(`Student with id: ${studentDto.id} is already exist`);
        }
    });
router.delete('/student',
    query('id').isInt(),
    validationMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.query;
        const student = await studentController.deleteStudent(Number(id));
        if (student) {
            res.status(200).send({student});
        } else {
            res.status(404).send(`Student id: ${id} was not found`);
        }
    }));

router.get('/student',
    query('id').optional().isInt().notEmpty(),
    query('name').optional().isString().notEmpty(),
    validationMiddleware,
    asyncHandler(async (req, res, next) => {
        const {id, name} = req.query;
        switch (true) {
            case !!id:
                const student = await studentController.getStudent(Number(id));
                if (student) {
                    res.status(200).send({student});
                } else {
                    res.status(404).send(`Student id: ${id} was not found`);
                    next();
                }
                break;

            case !!name:
                const students = studentController.getStudentsByName(name as string);
                if (students) {
                    res.status(200).send({students});
                } else {
                    res.status(404).send(`Student with name: ${name} was not found`);
                    next();
                }
                break;

        }
    }));

router.put('/student',
    query('id').isInt(),
    body('scores').isObject(),

    validationMiddleware, (req, res) => {
        const id = Number(req.query.id);
        const studentDto = req.body;
        const student = studentController.updateStudent(id, studentDto);
        if (student) {
            res.status(200).send(`Student with id: ${id} is updated with scores ${JSON.stringify(studentDto)}`);
        } else {
            res.status(404).send(`Student with id: ${id} is not found`);
        }
    });
router.get('/quantity/students',
    asyncHandler(async (req, res) => {
        const students = await studentController.getQuantityStudents();
        if (students) {
            res.status(200).send(`Students = ${students}`);
        }
    }));

router.get('/students',
    query('exam').isString().notEmpty(),
    validationMiddleware,
    asyncHandler(async (req, res) => {
        const  {exam}= req.query;
        const students =  studentController.getAverageScoreByExam(exam as string);
        if (students) {
            res.status(200).send(`Average ${exam} score  = ${students}`);
        }
    }));



export default router;