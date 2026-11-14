import { Recipe } from '../db/models/recipe.js'
export async function createRecipe({ title, author, ingredients, imageUrl }) {
  const recipe = new Recipe({ title, author, ingredients, imageUrl })
  return await recipe.save()
}
