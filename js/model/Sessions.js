import mongoose from "mongoose";
const {Schema, model} = mongoose;

const sessionSchema = new Schema({
    email: String,
    loginDate: Date,
    expiryDate: Date, 
});

const Session = model("Session", sessionSchema);

export default Session;