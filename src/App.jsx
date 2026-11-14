import { RecipeList } from './components/RecipeList.jsx'
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
export function App() {
  return <RecipeList recipes={recipes} />
}
