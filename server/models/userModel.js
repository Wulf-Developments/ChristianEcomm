import mongoose from "mongoose";
import bcyrpt from "bcryptjs";

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
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcyrpt.compare(enteredPassword, this.password);
};

// Should hash the password on registration.
userSchema.pre("save", async function (next) {
  //conditional will check to see if the password is being modified so it wont update the password constantly.
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcyrpt.genSalt(10);
  this.password = await bcyrpt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

export default User;
