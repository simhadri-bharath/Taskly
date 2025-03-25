import mongoose from 'mongoose';

const connectDB=async (DATABASE_URL)=>{
        try{
            const DB_OPTIONS={
                dbName:"userJwtAuth",
            }
            await mongoose.connect(DATABASE_URL,DB_OPTIONS);
            console.log("Database connected successfully");
        }
        catch(error){
            console.log(error);
        }
}
export default connectDB;
// In the above code, we have created a function called connectDB that accepts a DATABASE_URL as an argument.
//  We have used the mongoose.connect() method to connect to the MongoDB database.
//  We have also defined some DB_OPTIONS like dbName, which specifies the name of the database. 
// We have used the await keyword to wait for the connection to be established. If the connection is successful, we log a success message; otherwise, we log the error message.  
//  Now, let's import this function in the app.js file and call it to connect to the database.