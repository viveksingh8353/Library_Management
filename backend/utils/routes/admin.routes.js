import express from 'express';
import {
  adminCreate,
  adminMulter,
  deleteAllFaculity,
  deleteFaculity,
  findAllFaculity,
  findFaculity,
  getAllcourseByAdminId,
  loginAdmin
} from '../controller/Admin.controller.js';

const adminRouter = express.Router();

// Auth
adminRouter.post('/admin/login', loginAdmin);
adminRouter.post('/admin-create', adminMulter.single('adminProfile'), adminCreate);

// Faculty
adminRouter.get('/faculity-find/admin/:AdminId/:fId', findFaculity);
adminRouter.get('/faculity-all/admin/:AdminId', findAllFaculity);
adminRouter.delete('/faculity-delete/admin/:AdminId/:fId', deleteFaculity);
adminRouter.delete('/faculity-deletemany/admin/:AdminId', deleteAllFaculity);

// Course
adminRouter.get('/all-course/admin/:AdminId', getAllcourseByAdminId);

export default adminRouter;
