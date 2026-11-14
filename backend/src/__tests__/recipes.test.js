import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createRecipe,
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByIngredients,
} from '../services/recipes.js'
import { Recipe } from '../db/models/recipe.js'

const sampleRecipes = [
  {
    title: 'Scrambled Eggs',
    author: 'John Doe',
    ingredients: ['2 eggs', '1 cup cheese'],
    imageUrl:
      'https://bellyfull.net/wp-content/uploads/2026/05/Scrambled-Eggs-Hero.jpg',
  },
  {
    title: 'Spaghetti Bolognese',
    author: 'Daniel Bugl',
    ingredients: ['8oz dry spaghetti pasta', '1 cup canned bolognese sauce'],
    imageUrl:
      'https://www.recipetineats.com/tachyon/2018/07/Spaghetti-Bolognese.jpg?resize=900%2C1260&zoom=0.72',
  },
  {
    title: 'Birria Ramen',
    author: 'Regina Steffen',
    ingredients: [
      '2 packs spicy chicken ramen',
      '1 pack frozen birria meat',
      '1 white onion',
      '1 bunch fresh cilantro',
      '1 cup mozzarella cheese',
    ],
    imageUrl:
      'https://www.twopurplefigs.com/wp-content/uploads/2022/10/Birria-Ramen-6.jpg',
  },
  {
    title: 'Grilled Cheese',
  },
]

let createdSampleRecipes = []
beforeEach(async () => {
  await Recipe.deleteMany({})
  createdSampleRecipes = []
  for (const recipe of sampleRecipes) {
    const createdRecipe = new Recipe(recipe)
    createdSampleRecipes.push(await createdRecipe.save())
  }
})

describe('listing recipes', () => {
  test('should return all recipes', async () => {
    const recipes = await listAllRecipes()
    expect(recipes.length).toEqual(createdSampleRecipes.length)
  })

  test('should return recipes sorted by creation date descending by default', async () => {
    const recipes = await listAllRecipes()
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(recipes.map((recipe) => recipe.createdAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.createdAt),
    )
  })

  test('should take into account provided sorting options', async () => {
    const recipes = await listAllRecipes({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(recipes.map((recipe) => recipe.updatedAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.updatedAt),
    )
  })

  test('should be able to filter recipes by author', async () => {
    const recipes = await listRecipesByAuthor('Regina Steffen')
    expect(recipes.length).toBe(1)
  })

  test('should be able to filter recipes by a single ingredient', async () => {
    const recipes = await listRecipesByIngredients(['cheese'])
    expect(recipes).toHaveLength(2)
  })

  test('should be able to filter recipes by multiple ingredients', async () => {
    const recipes = await listRecipesByIngredients(['cheese', 'onion'])
    expect(recipes).toHaveLength(1)
  })
})

describe('creating recipes', () => {
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
    expect(foundRecipe.createdAt).toBeInstanceOf(Date)
    expect(foundRecipe.updatedAt).toBeInstanceOf(Date)
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
