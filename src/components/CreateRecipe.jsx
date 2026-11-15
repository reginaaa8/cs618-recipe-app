import { useState } from 'react'

export function CreateRecipe() {
  const [ingredients, setIngredients] = useState([''])

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

    const recipeIngredients = ingredients
      .map((ingredient) => ingredient.trim())
      .filter(Boolean)

    console.log(recipeIngredients)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Recipe</h3>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input type='text' id='create-title' name='title' />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input type='text' id='create-author' name='create-author' />
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
        <input type='url' id='create-imageUrl' name='imageUrl' />
      </div>
      <br />
      <input type='submit' value='Create Recipe' />
    </form>
  )
}
