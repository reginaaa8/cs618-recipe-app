import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'

import dotenv from 'dotenv'
dotenv.config()

await initDatabase()

const recipe = new Recipe({
  title: 'Grilled Cheese',
  author: 'John Doe',
  ingredients: ['2 slices of bread', '2 slices of cheese'],
  imageURL:
    'https://assets.bonappetit.com/photos/6917b6e28552dda8588ece36/1:1/w_1920,c_limit/best-grilled-cheese_RECIPE_V1_111125_13783_VOG_final.jpg',
})
await recipe.save()
const recipes = await Recipe.find()
console.log(recipes)
