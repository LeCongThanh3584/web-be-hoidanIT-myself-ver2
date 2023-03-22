import express from "express";
import configViewEngine from "./config/viewEngine";
// import initWebRoute from './routes/web';
import mainRoute from "./routes/main.routes";
import APIRoute from "./routes/API.routes";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 2619;
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: "50mb" })); //Đây là middleware
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

configViewEngine(app);
// initWebRoute(app);

app.use((req, res, next) => {
  console.log("404 not found");
  next();
});

app.use("/", mainRoute);
app.use("/api/test", APIRoute);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "src/public/images");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });

// app.post("/uploadfile", upload.single("single-file"), (req, res, next) => {
//   const file = req.file;
//   if (!file) {
//     const error = new Error("Please upload a file");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(file.fieldname);
// });

//handle 404 not found

//middware xử lý 404 not found

//handle 404 not found

app.use((req, res, next) => {
  res.send("404 not found");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
