import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Name Required!']
    },
    email: {
        type: String,
        required: [true, 'Email Required!']
    },
    phone: {
        type: String,
        required: [true, 'Phone Number Required!']
    },
    aboutMe: {
        type: String,
        required: [true, 'About me field is Required!']
    },
    password: {
        type: String,
        required: [true, 'Password is Required!'],
        minLength: [8, 'Password must contain at least 8 characters!'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    resume: {
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    portfolioURL: {
        type: String,
        required: [true, "Portfolio URL is required!"]
    },
    githubURL: String,
    instagramURL: String,
    facebookURL: String,
    twitterURL: String,
    linkedInURL: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
// for hashing password
userSchema.pre('save', async function(next){
    if(!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// to compare hashed password with enteredpassword
userSchema.methods.comparePassword = async function(enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
};

// generate json web token

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
}
// Generate reset token
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken
}

export const User = mongoose.model('User', userSchema);

