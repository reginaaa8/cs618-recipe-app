import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { createRecipe } from '../api/recipes.js'

export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [imageUrl, setImageUrl] = useState('')
  const createRecipeMutation = useMutation({
    mutationFn: () =>
      createRecipe({
        title,
        author,
        ingredients: ingredients
          .map((ingredient) => ingredient.trim())
          .filter(Boolean),
        imageUrl,
      }),
  })

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
    <form onSubmit={handleSubmit}>
      <h3>Add a New Recipe</h3>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          id='create-title'
          name='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          type='text'
          id='create-author'
          name='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <br />
      <h4>Ingredients</h4>

      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type='text'
            value={ingredient}
            placeholder={`Ingredient ${index + 1}`}
            onChange={(e) => updateIngredient(index, e.target.value)}
          />
          <button
            type='button'
            onClick={() => removeIngredient(index)}
            disabled={ingredients.length === 1}
          >
            Remove
          </button>
        </div>
      ))}

      <button type='button' onClick={addIngredient}>
        Add Ingredient
      </button>
      <br />
      <div>
        <label htmlFor='create-imageUrl'>Image URL: </label>
        <input
          type='url'
          id='create-imageUrl'
          name='imageUrl'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={createRecipeMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createRecipeMutation.isPending}
      />
      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          Recipe created successfully!
        </>
      ) : null}
    </form>
  )
}
