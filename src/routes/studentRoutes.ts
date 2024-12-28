import {Router} from 'express';
import StudentController from '../controller/StudentController';
import StudentServiceImpl from '../services/StudentServiceImpl';
import {body} from 'express-validator';
import validationMiddleware from '../middleware/validationMiddleware';
import AsyncHandler from 'express-async-handler';


const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);
router.post('',
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


export default router;