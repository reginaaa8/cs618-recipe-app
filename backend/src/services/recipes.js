import { Recipe } from '../db/models/recipe.js'

export async function createRecipe({ title, author, ingredients, imageUrl }) {
  const recipe = new Recipe({ title, author, ingredients, imageUrl })
  return await recipe.save()
}

async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}
export async function listRecipesByAuthor(author, options) {
  return await listRecipes({ author }, options)
}

export async function listRecipesByIngredients(ingredients, options) {
  return await listRecipes(
    {
      ingredients: {
        $all: ingredients.map((ingredient) => new RegExp(ingredient, 'i')),
      },
    },
    options,
  )
}
