import * as mongoose from 'mongoose'

export interface User extends mongoose.Document {
    name: String
    email: String
    password: String
    matches(password): boolean
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email, projection?): Promise<User>
}

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    }
})

userSchema.statics.findByName = function(email, projection) {
    return this.findOne(email, projection)
}

userSchema.methods.matches = function(password): boolean {
    return password == this.password
}

export const User = mongoose.model<User, UserModel>('User', userSchema)