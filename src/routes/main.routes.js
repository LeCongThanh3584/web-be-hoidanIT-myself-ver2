import express from "express";
import homeControllel from "../controller/home.Controller";
import singleFileMiddleWare from "../middlewares/singleFile.middleware";
const router = express.Router();

// const initWebRoute = (app) => {
//     router.get('/home', homeControllel.getHomePage);
//     router.get('/news', homeControllel.getNewPage);
//     return app.use('/', router);
// }

// module.exports = initWebRoute;

router.get("/home", homeControllel.getHomePage);
router.get("/details/user/:userId", homeControllel.getDetailPage);
router.post("/create-new-user", homeControllel.createNewUser); //thêm
router.post("/delete-user", homeControllel.deleteUser); //xóa
router.get("/edit-user/:userId", homeControllel.editUser); //sửa
router.post("/update-user", homeControllel.updateUser);

//upload file
router.get("/upload", homeControllel.getUploadPage);

router.post(
  "/upload-singleFile",
  singleFileMiddleWare.upload.single("single-file"),
  homeControllel.uploadSingleFile
);

router.post(
  "/upload-multipleFile",
  singleFileMiddleWare.upload.array("multiple-file", 2),
  homeControllel.uploadMultipleFile
);

module.exports = router;
