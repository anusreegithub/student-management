import express, { Request, Response } from "express";
import StudentController from "../controllers/studentController";

const router = express.Router();

router.post("/add-students",StudentController.createdStudent);
router.get('/all-students', StudentController.getStudents);
router.get('/student/:id', StudentController.getStudentById);  
router.put('/update-student/:id', StudentController.updateStudent); 
router.delete('/delete-student/:id', StudentController.deleteStudent);

export default router;
