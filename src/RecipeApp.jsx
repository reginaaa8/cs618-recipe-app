import { RecipeList } from './components/RecipeList.jsx'
import { CreateRecipe } from './components/CreateRecipe.jsx'
import { RecipeFilter } from './components/RecipeFilter.jsx'
import { RecipeSorting } from './components/RecipeSorting.jsx'

const recipes = [
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
      'https://whatmollymade.com/wp-content/uploads/2023/09/birria-ramen-11.jpg',
  },
  { title: 'Grilled Cheese' },
]

export function RecipeApp() {
  return (
    <div style={{ padding: 8 }}>
      <CreateRecipe />
      <br />
      <hr />
      Filter by:
      <RecipeFilter field='author' />
      <br />
      <RecipeSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  )
}
