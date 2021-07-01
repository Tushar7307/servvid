const Joi = require('joi')
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3
    },
    dob:{
        type:Date,
        require:true
    },
    address:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        min:6
    },
    createAt:{
        type:String,
        required:true
    }
});

const User = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        dob:Joi.date().required(),
        address:Joi.string().min(5).max(100).required(),
        description:Joi.string().min(6).max(200).required(),
        createAt:Joi.string().required()
    });
    return schema.validate(user);
}


exports.User = User;
exports.validate = validateUser;