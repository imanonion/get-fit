const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = {
    UserModel: UserModel
}