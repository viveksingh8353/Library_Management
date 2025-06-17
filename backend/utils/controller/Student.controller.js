import mongoose from "mongoose";
import handleError from "../middlerare/error_logs/handleError.js";
import adminModal from "../modal/admin.modal.js";
import multer from "multer";
import path from "path";
import bcrypt from 'bcrypt';
import studentModal from "../modal/student.modal.js";

// Set destination path
const studentPath = path.join("public/student/");

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, studentPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const studentMulter = multer({ storage: store });

export const studentRegistor = async (req, res) => {
  const { studentName, studentEmail, studentPassword } = req.body;
  const studentPhoto = req.file;
  const { AdminId } = req.params;

  if (!studentName || !studentEmail || !studentPassword || !studentPhoto) {
    return handleError(res, 400, "All fields including photo are required.");
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(AdminId)) {
      return handleError(res, 400, "Invalid Admin ID.");
    }

    const adminExists = await adminModal.findById(AdminId);
    if (!adminExists) {
      return handleError(res, 400, "Admin ID not found.");
    }

    const existingStudent = await studentModal.findOne({ StudentEmail: studentEmail });
    if (existingStudent) {
      return handleError(res, 400, "Student already exists.");
    }

    const hashedPassword = await bcrypt.hash(studentPassword, 12);

    const newStudent = new studentModal({
      StudentName: studentName,
      StudentEmail: studentEmail,
      StudentPassword: hashedPassword,
      StudentPhoto: studentPhoto.filename,
      AdminId: AdminId,
    });

    const savedStudent = await newStudent.save();
    return handleError(res, 201, "Student registered successfully", savedStudent);
  } catch (err) {
    return handleError(res, 500, `Server error: ${err.message}`);
  }
};
