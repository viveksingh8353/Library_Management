import express from 'express';
import { studentMulter, studentRegistor } from '../controller/Student.controller.js';

const studentRouter = express.Router();

// ✅ Student Registration Route (uses multer for image upload)
studentRouter.post(
  "/student/register/admin/:AdminId",
  studentMulter.single("studentPhoto"),
  studentRegistor
);

export default studentRouter;
