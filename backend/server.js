// Load environment variables
import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './utils/database/db.js';
import bodyParser from 'body-parser';
import adminRouter from './utils/routes/admin.routes.js';
import cors from 'cors';
import lodash from 'lodash';
import faculityRouter from './utils/routes/faculity.routes.js';
import courseRouter from './utils/routes/course.routers.js';
import studentRouter from './utils/routes/student.routes.js';
import cookieParser from 'cookie-parser';





const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Routes
// Routes
app.use("/api/v1", adminRouter);
app.use("/api/v1", faculityRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", studentRouter);

// Default route for homepage
app.get('/', (req, res) => {
    res.send('✅ Library Management Server is Running!');
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    db(); // MongoDB connect
});



// Optional lodash demos (can remove in production)
const arr = [1, 2, 3, 4, 5, 6, 6];
const chunkArray = lodash.chunk(arr, 2);
console.log("Chunked array:", chunkArray);

const compactArr = lodash.compact([9, 1, 2, 3, 4, false, "", 3, 4, 5]);
console.log("Compact array:", compactArr);

const user = {
    name: "abc",
    email: "abc@",
    mobile: "52265262"
};
const deepClone = lodash.cloneDeep(user);
deepClone.email = "hello@";
console.log("Cloned Email:", deepClone.email);
console.log("Original Email:", user.email);

const lower = "hello world";
console.log("Capitalized:", lodash.capitalize(lower));
console.log("Uppercased:", lodash.upperCase(lower));
