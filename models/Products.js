import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    price: {
      type: Number,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },

  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);
Schema.virtual("categories", {
  ref: "category",
  localField: "categoryId",
  foreignField: "_id",
});
export default mongoose.model("Products", Schema);
