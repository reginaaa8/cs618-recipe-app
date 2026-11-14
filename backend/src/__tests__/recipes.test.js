import mongoose from 'mongoose'
import { describe, expect, test } from '@jest/globals'
import { createRecipe } from '../services/recipes.js'
import { Recipe } from '../db/models/recipe.js'

describe('creating recipe', () => {
  test('with all parameters should succeed', async () => {
    const recipe = {
      title: 'Grilled Cheese',
      author: 'Test User',
      ingredients: ['2 slices of bread', '2 slices of cheese'],
      imageUrl:
        'https://assets.bonappetit.com/photos/6917b6e28552dda8588ece36/1:1/w_1280,c_limit/best-grilled-cheese_RECIPE_V1_111125_13783_VOG_final.jpg',
    }
    const createdRecipe = await createRecipe(recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundRecipe = await Recipe.findById(createdRecipe._id)
    expect(foundRecipe).toEqual(expect.objectContaining(recipe))
  })

  test('without title should fail', async () => {
    const recipe = {
      author: 'Test User',
      ingredients: ['2 slices of bread', '2 slices of cheese'],
      imageUrl:
        'https://assets.bonappetit.com/photos/6917b6e28552dda8588ece36/1:1/w_1280,c_limit/best-grilled-cheese_RECIPE_V1_111125_13783_VOG_final.jpg',
    }
    try {
      await createRecipe(recipe)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  test('with only required parameters should succeed', async () => {
    const recipe = {
      title: 'Grilled Cheese',
    }
    const createdRecipe = await createRecipe(recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})
