import express from "express";
const router=express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth.js';
import userController from "../controllers/userController.js";

//Route LevelMiddle Ware -To Protect Route
router.use("/changepassword",checkUserAuth);
router.use("/loggeduser",checkUserAuth)


//Public Rotues
router.post("/register",UserController.userRegistration);
router.post("/login",UserController.userLogin);
router.post("/send-rest-password-email",userController.sendUserPasswordResetEmail)
router.post("/reset-password/:id/:token",userController.userPasswordReset);


//Protected Routes
router.post('/changePassword',UserController.changeUserPassword);
router.get('/loggeduser',userController.loggedUser);

export default router;