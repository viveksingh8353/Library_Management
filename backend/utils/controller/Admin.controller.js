import multer from "multer";
import path from "path";
import handleError from "../middlerare/error_logs/handleError.js";
import adminModal from "../modal/admin.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import faculityModal from "../modal/faculity.modal.js";
import courseModal from "../modal/course.modal.js";

// Multer config for storing admin profile photo
const adminPath = path.join("public/admin/");
const store = multer.diskStorage({
  destination: (req, file, cb) => cb(null, adminPath),
  filename: (req, file, cb) => cb(null, file.originalname)
});
export const adminMulter = multer({ storage: store });

// ✅ Admin Registration
export const adminCreate = async (req, res) => {
  const { adminName, adminEmail, adminPassword } = req.body;
  const adminProfile = req.file;

  if (!adminProfile) return handleError(res, 400, "Please upload admin profile photo");
  if (!(adminName && adminEmail && adminPassword)) return handleError(res, 400, "All fields are required");

  try {
    const existingAdmin = await adminModal.findOne({ adminEmail });
    if (existingAdmin) return handleError(res, 400, "Admin already exists");

    const hashpass = await bcrypt.hash(adminPassword, 10);
    const adminCreate = new adminModal({
      adminName,
      adminEmail,
      adminPassword: hashpass,
      adminProfile: adminProfile.filename
    });

    const savedAdmin = await adminCreate.save();
    const token = jwt.sign({ adminId: savedAdmin._id }, process.env.SECURTY_KEY, { expiresIn: "4d" });

    return handleError(res, 201, "Admin created successfully", savedAdmin, token);
  } catch (err) {
    return handleError(res, 500, `Server error: ${err.message}`);
  }
};

// ✅ Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return handleError(res, 400, "Email and password required");

  try {
    const admin = await adminModal.findOne({ adminEmail: email });
    if (!admin) return handleError(res, 401, "Invalid credentials");

    const isMatch = await bcrypt.compare(password, admin.adminPassword);
    if (!isMatch) return handleError(res, 401, "Incorrect password");

    const token = jwt.sign({ adminId: admin._id }, process.env.SECURTY_KEY, { expiresIn: "4d" });
    return handleError(res, 200, "Login successful", admin, token);
  } catch (err) {
    return handleError(res, 500, `Login error: ${err.message}`);
  }
};

// ✅ Get faculty by admin and faculty id
export const findFaculity = async (req, res) => {
  const { AdminId, fId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(AdminId) || !mongoose.Types.ObjectId.isValid(fId)) {
    return handleError(res, 400, "Invalid admin or faculty ID");
  }

  try {
    const checkAdmin = await adminModal.findById(AdminId);
    if (!checkAdmin) return handleError(res, 404, "Admin not found");

    const faculty = await faculityModal.findById(fId).populate("AdminId");
    return faculty ? handleError(res, 200, "Faculty found", faculty)
                   : handleError(res, 404, "Faculty not found");
  } catch (err) {
    return handleError(res, 500, `Error: ${err.message}`);
  }
};

// ✅ Get all faculties by admin ID
export const findAllFaculity = async (req, res) => {
  const { AdminId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(AdminId)) return handleError(res, 400, "Invalid admin ID");

  try {
    const checkAdmin = await adminModal.findById(AdminId);
    if (!checkAdmin) return handleError(res, 404, "Admin not found");

    const allFaculties = await faculityModal.find();
    return handleError(res, 200, "Faculties fetched", allFaculties);
  } catch (err) {
    return handleError(res, 500, `Error: ${err.message}`);
  }
};

// ✅ Delete faculty
export const deleteFaculity = async (req, res) => {
  const { AdminId, fId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(AdminId) || !mongoose.Types.ObjectId.isValid(fId)) {
    return handleError(res, 400, "Invalid ID(s)");
  }

  try {
    const admin = await adminModal.findById(AdminId);
    if (!admin) return handleError(res, 404, "Admin not found");

    const deleted = await faculityModal.findByIdAndDelete(fId);
    if (deleted) {
      await courseModal.deleteMany({ faculityId: fId });
      return handleError(res, 200, "Faculty and related courses deleted");
    }
    return handleError(res, 404, "Faculty not found");
  } catch (err) {
    return handleError(res, 500, `Error: ${err.message}`);
  }
};

// ✅ Delete all faculties
export const deleteAllFaculity = async (req, res) => {
  const { AdminId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(AdminId)) return handleError(res, 400, "Invalid admin ID");

  try {
    const checkAdmin = await adminModal.findById(AdminId);
    if (!checkAdmin) return handleError(res, 404, "Admin not found");

    await faculityModal.deleteMany();
    return handleError(res, 200, "All faculties deleted");
  } catch (err) {
    return handleError(res, 500, `Error: ${err.message}`);
  }
};

// ✅ Get all courses by Admin ID
export const getAllcourseByAdminId = async (req, res) => {
  const { AdminId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(AdminId)) return handleError(res, 400, "Invalid admin ID");

  try {
    const courses = await courseModal.find();
    return handleError(res, 200, "Courses fetched", courses);
  } catch (err) {
    return handleError(res, 500, `Error: ${err.message}`);
  }
};
