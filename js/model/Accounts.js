import mongoose from "mongoose";
const {Schema, model} = mongoose;

const accountSchema = new Schema({
    email: String,
    password: String,
    type: String,
    image: String,
    name: String,
    bio: String
});

const Account = model("Account", accountSchema);

export default Account;