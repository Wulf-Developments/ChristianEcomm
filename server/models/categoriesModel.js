import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = mongoose.Schema(
  {
    cat_name: {
      type: String,
      required: true,
      unique: true,
    },
    cat_items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    // Adds a relationship between a User admin and a product
    // this is useful to see which admin, if multiple created a category
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    slug: { type: String },
  },
  { timestamps: true }
);
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.cat_name, { lower: true });
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
