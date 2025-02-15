const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 }, 
  },
  { timestamps: true } 
);

userSchema.statics.isEmailTaken = async function (email) {
    const result = await this.findOne({ email });
    return result;
  };
  
  userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
    next();
  });
  
  userSchema.methods.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = mongoose.model("User", userSchema);
module.exports = User;
