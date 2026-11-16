import { RecipeList } from '../components/RecipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/RecipeFilter.jsx'
import { RecipeSorting } from '../components/RecipeSorting.jsx'
import { Header } from '../components/Header.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'
import { useState } from 'react'

export function RecipeApp() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const recipesQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  })

  const recipes = recipesQuery.data ?? []

  return (
    <div className='min-h-screen bg-[#FAF8F3]'>
      <Header />
      <main className='max-w-6xl mx-auto px-4 pt-6 space-y-6'>
        <CreateRecipe />
        <div className='flex items-center gap-6 '>
          <RecipeFilter
            field='author'
            value={author}
            onChange={(value) => setAuthor(value)}
          />
          <RecipeSorting
            fields={['createdAt', 'updatedAt']}
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            orderValue={sortOrder}
            onOrderChange={(orderValue) => setSortOrder(orderValue)}
          />
        </div>
        <RecipeList recipes={recipes} />
      </main>
    </div>
  )
}
