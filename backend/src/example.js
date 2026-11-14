import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'

await initDatabase()

const recipe = new Recipe({
  title: 'Birria Ramen',
  author: 'Regina Steffen',
  ingredients: [
    '2 packs chicken ramnen',
    '1 pack frozen birria meat',
    '1 white onion',
    '1 bunch fresh cilantro',
    '1 cup shredded cheese',
  ],
  imageURL:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwI3WPWIO6pkdWSNsmErdNOT91UPQMQ-bXSb7UUM1UNQ&s=10',
})
await recipe.save()
const recipes = await Recipe.find()
console.log(recipes)
