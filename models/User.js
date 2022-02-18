const mongoose = require('mongoose');
// Schema of the user table
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true,
        maxlength: [5, 'Must be less than 5 characters, got {VALUE}.'],
    },
    email: {
        type: String,
        required: [true, 'E-mail is required'],
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address.'],
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"],
        trim: true,
        // cast:false,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female', 'Others'],
            message: '{VALUE} is not supported',
        },
    },
    hobbies: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('User', UserSchema);