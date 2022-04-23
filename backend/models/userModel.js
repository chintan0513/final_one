//for stroing user data in our data base so that's why we use model

//it declares what type of data 

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

//userSchema

const userSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { //in case we need
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    phoneNo: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}
);

userSchema.pre('save', async function (next) { //before saving -> call a function with NEXT middleware.
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10)  //we generate salt for our password, more higher the value-> more secure the password
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
