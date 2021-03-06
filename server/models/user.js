const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// Encrypts the password before saved to the db. pre-save 'hook'
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

// De-crypts the password when login to compare it against password attempt
// This method has been added the the method property of our userSchema
// So any User in our back-end now has a user.methods.checkPassword()
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// Removes the encrypted password from the user object before sending it back to the client
userSchema.methods.withoutPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};



module.exports = mongoose.model('User', userSchema)