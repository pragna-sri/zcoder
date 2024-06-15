import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    techStack: { type: String, default: '' },
    competitiveProgrammingRating: { type: Number, default: 0 },
    favouriteLanguage: { type: String, default: '' }
});

const UserModel = mongoose.model("User", UserSchema);
export { UserModel as User };