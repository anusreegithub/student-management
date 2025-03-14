import { Student } from "../models/studentModel";

class StudentService {
  async createStudent(data: { name: string; age: number; email: string; course: string }) {
    const student = new Student(data);
    return await student.save();
  }

  async getAllStudents() {
    return await Student.find();
  }

  async getStudentById(id: string) {
    return await Student.findById(id);
  }

  async updateStudent(id: string, data: { name?: string; age?: number; email?: string; course?: string }) {
    return await Student.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteStudent(id: string) {
    return await Student.findByIdAndDelete(id);
  }
}

export default new StudentService();
