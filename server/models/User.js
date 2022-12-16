/*
    Here we create the schema required for the user's data
*/

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transaction: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

/*
  This creates a mongoose model called user with the Schema above.
  Now when we enter a new user into the DB it will prompt us to follow the structure
  we hace set out
*/
const User = mongoose.model("User", userSchema);

export default User;
