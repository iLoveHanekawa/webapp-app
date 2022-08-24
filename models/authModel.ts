import mongoose, { mongo } from "mongoose";

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
})

export default mongoose.model('users', authSchema)