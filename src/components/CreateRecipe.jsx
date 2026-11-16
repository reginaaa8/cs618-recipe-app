import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useState } from 'react'
import { createRecipe } from '../api/recipes.js'

export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [imageUrl, setImageUrl] = useState('')
  const [token] = useAuth()
  const queryClient = useQueryClient()
  const createRecipeMutation = useMutation({
    mutationFn: () =>
      createRecipe(token, {
        title,
        ingredients: ingredients
          .map((ingredient) => ingredient.trim())
          .filter(Boolean),
        imageUrl,
      }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  if (!token)
    return (
      <div className='text-center text-[#35483D] font-medium py-6'>
        Please log in to create new posts.
      </div>
    )

  function addIngredient() {
    setIngredients([...ingredients, ''])
  }

  function updateIngredient(index, value) {
    setIngredients(
      ingredients.map((ingredient, i) => (i === index ? value : ingredient)),
    )
  }

  function removeIngredient(index) {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  function handleSubmit(e) {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  return (
    <form
      className='bg-white rounded-2xl border border-[#E9E3D8] p-6 max-w-2xl mx-auto space-y-4'
      onSubmit={handleSubmit}
    >
      <h3 className='text-2xl font-semibold, text-[#35483D]'>
        Add a New Recipe
      </h3>
      <div>
        <label className='block font-semibold mb-2' htmlFor='create-title'>
          Title:{' '}
        </label>
        <input
          type='text'
          id='create-title'
          name='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border rounded-lg p-2 w-full'
        />
      </div>
      <h4 className='font-semibold'>Ingredients</h4>

      {ingredients.map((ingredient, index) => (
        <div key={index} className='flex items-center gap-2'>
          <input
            type='text'
            value={ingredient}
            placeholder={`Ingredient ${index + 1}`}
            onChange={(e) => updateIngredient(index, e.target.value)}
            className='border rounded-lg p-2 flex-1 min-w-0'
          />
          <button
            type='button'
            onClick={() => removeIngredient(index)}
            disabled={ingredients.length === 1}
            className='text-red-600 font-semibold hover:text-red-800 disabled:opacity-40 disabled:cursor-not-allowed'
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type='button'
        onClick={addIngredient}
        className='text-[#35483D] font-semibold hover:text-[#5D7A62] mt-3'
      >
        Add Ingredient
      </button>

      <div>
        <label htmlFor='create-imageUrl' className='block font-semibold mb-2'>
          Image URL:{' '}
        </label>
        <input
          type='url'
          id='create-imageUrl'
          name='imageUrl'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className='border rounded-lg p-2 w-full'
        />
      </div>
      <div className='flex flex-col items-center gap-2'>
        <input
          type='submit'
          value={
            createRecipeMutation.isPending ? 'Creating...' : 'Create New Recipe'
          }
          disabled={!title || createRecipeMutation.isPending}
          className='bg-[#35483D] text-white rounded-lg px-4 py-2 hover:bg-[#26372E] disabled:opacity-40 disabled:cursor-not-allowed'
        />{' '}
        {createRecipeMutation.isSuccess ? (
          <div className='text-green-700 text-sm font-medium'>
            Recipe created successfully!
          </div>
        ) : null}
      </div>
    </form>
  )
}
