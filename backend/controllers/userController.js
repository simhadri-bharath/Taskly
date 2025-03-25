import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from '../config/emailConfig.js'
class userController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;

        const user = await UserModel.findOne({ emai: email });
        if (user) {
            res.send({ "status": "failed", "message": "User already exists" });
        } else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
 
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const newUser = new UserModel({
                            name,
                            email,
                            password: hashPassword,
                            tc
                        });
                        await newUser.save();
                        const saved_user = await UserModel.findOne({ email: email });
                        //Generate token
                        const token = jwt.sign({ userId: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })

                        res.status(201).send({ "status": "sucess", "message": "registration Succesfull", "token": token })
                    }
                    catch (error) {
                        console.log(error);
                        res.send({ "status": "failed", "message": "unable to register" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "password does not match" });
                }
            }
            else {
                res.send({ "status": "failed", "message": "all fields are required" });
            }

        }
    }
    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (email === user.email && isMatch) {
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                        res.send({ "status": "success", "message": "login successfull", "token": token });
                    } else {
                        res.send({ "status": "failed", "message": "email or password is misMatched" });
                    }
                }
                else {
                    res.end({ "status": "failed", "message": "user doesn't  exits" });
                }
            }
            else {
                res.send({ "status": "failed", "message": "all fields are required" });
            }
        }
        catch (error) {
            console.log(error);
            res.send({ "status": "failed", "message": "unable to login" });
        }
    }
    static changeUserPassword = async (req, res) => {
        const { password, password_confirmation } = req.body;
        if (password && password_confirmation) {
            if (password !== password_confirmation) {
                res.send({ "status": "failed", "message": "new password and confirmation password doesnt  matched" });
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                await UserModel.findByIdAndUpdate(req.user._id, {
                    $set: {
                        password: hashedPassword
                    }
                })
                res.send({ "status": "sucess", "message": "password changed succefully" });
            }
        }
        else {
            res.send({ "status": "failed", "message": "all fields are required" });
        }
    }
    static loggedUser = async (req, res) => {
        res.send({ "user": req.user })
      }
    static sendUserPasswordResetEmail = async (req, res) => {
        const { email } = req.body
        if (email) {
            const user = await UserModel.findOne({ email: email });
            if (user) {
                // console.log(user);
                const secert = user._id + process.env.JWT_SECRET_KEY;
                const token = jwt.sign({ userID: user._id }, secert, { expiresIn: '5m' });
                const link = `http://localhost:3000/api/user/resetpassword/${user._id}/${token}`;
                console.log(link)
                //send email

                let info=await transporter.sendMail({
                    from:process.env.EMAIL_FROM,
                    to:user.email,
                    subject:"user password reset mail",
                    html:`<a href=${link}>Clicke here</a> to reset the password`
                })
                res.send({ "status": "sucess", "message": "password reset email sent ... please your email" })

            }
            else {
                res.send({ "status": "failed", "message": "email doesnt exists" })
            }
        }
        else {
            res.send({ "status": "failed", "message": "email is required || email doesnt exists" });
        }

    }

    static userPasswordReset=async (req,res)=>{
        const {password,password_confirmation}=req.body;
        const {id,token}=req.params
        const user=await UserModel.findById(id)
        const new_secret=user._id+process.env.JWT_SECRET_KEY
        try{
            jwt.verify(token,new_secret)
            if(password && password_confirmation){
                if(password!==password_confirmation){
                    res.send({"status":"failed","message":"new Passsword or confirm new password doesnt match"});
                }
                else{
                    const salt=await bcrypt.genSalt(10);
                    const newHashPassword=await bcrypt.hash(password,salt);
                    await UserModel.findByIdAndUpdate(user._id,{$set:{password:newHashPassword}});
                    res.send({"status":"sucess","message":"password reset done succefully"});

                }
            }
            else{
                res.send({"status":"failed","message":"all fields are required"});

            }
        }catch(error){
            console.log(error);
            res.send({"status":"failed","message":"invalid token"});
        }
    }
}
export default userController;