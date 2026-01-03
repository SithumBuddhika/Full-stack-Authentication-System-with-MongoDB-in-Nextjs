// import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";
// import { type } from "os";

// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: [true, "Please provide a username"],
//         unique: true,
//     },
//     email:{
//         type: String,
//         required: [true, "Please provide a email"],
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: [true, "Please provide a password"],
//     },
//     isVerified: {
//         type: Boolean,
//         default: false,
//     },
//     isAdmin: {
//         type: Boolean,
//         defult: false,
//     },
//     forgotPasswordToken: String,
//     forgotPasswordTokenExpiry: Date,
//     verifyToken: String,
//     verifyTokenExpiry: Date,
// })

// const User = mongoose.model.user || mongoose.model("user", userSchema);

// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false, // Fixed typo: "defult" to "default"
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

// Check if the model exists before creating a new one (important for Next.js hot reloading)
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

