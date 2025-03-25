import mongoose from "mongoose";

//Defining schema

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    tc: { type: Boolean, required: true },

});
//Model
const UserModel=mongoose.model("User",userSchema);
export default UserModel;