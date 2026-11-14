import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    ingredients: [String],
    imageUrl: String,
  },
  { timestamps: true },
)
export const Recipe = mongoose.model('Recipe', recipeSchema)
