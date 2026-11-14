import PropTypes from 'prop-types'
export function Recipe({ title, ingredients, author, imageUrl }) {
  return (
    <article>
      <h3>{title}</h3>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div>
        <ul>
          {ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      {author && (
        <em>
          <br />
          by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.string,
  imageUrl: PropTypes.string,
}
