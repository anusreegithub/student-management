import { Request, Response } from "express";
import { ApiResponse } from "../models/apiResponse";
import { Student } from "../models/studentModel";

class StudentController {
  static async createdStudent(req: Request, res: Response): Promise<void> {
    try {
      const { name, age, email, course } = req.body;

      if (!name || !age || !email || !course) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      const student = new Student({ name, age, email, course });
      await student.save();
      res.status(201).json({
        message: "Student added successfully",
        student,
      } as ApiResponse<typeof Student>);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  static async getStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await Student.find();
      res.status(200).json({ students });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch students", error });
    }
  }

  static async getStudentById(req: Request, res: Response): Promise<void> {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).json({ student });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student", error });
    }
  }

  static async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, age, email, course } = req.body;

      const updateStudent = await Student.findByIdAndUpdate(
        id,
        { name, age, email, course },
        { new: true }
      );

      if (!updateStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res
        .status(200)
        .json({ message: "Student updated successfully", updateStudent });
    } catch (error) {
      res.status(500).json({ message: "Failed to update student", error });
    }
  }

  static async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleteStudent = await Student.findByIdAndDelete(id);
      if (!deleteStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete student", error });
    }
  }
}

export default StudentController;
