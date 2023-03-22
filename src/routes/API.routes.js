import express from "express";
import APIcontroller from "../controller/API.controller";
const router = express.Router();

router.get("/getUserData", APIcontroller.getAllUsers); //method get - READ
router.post("/createUser", APIcontroller.createUser); //method post - CREATE
router.put("/updateUser", APIcontroller.updateUser); //method update - UPDATE
router.delete("/deleteUser", APIcontroller.deleteUser); //method delete - DELETE

module.exports = router;
