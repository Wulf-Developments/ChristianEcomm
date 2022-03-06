import mongoose from "mongoose";

const dynamicContentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
  },
});

const Dynamic = mongoose.model("Dynamic", dynamicContentSchema);

export default Dynamic;
