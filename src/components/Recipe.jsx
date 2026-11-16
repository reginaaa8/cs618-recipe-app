import PropTypes from 'prop-types'
import { User } from './User.jsx'
export function Recipe({ title, ingredients, author, imageUrl }) {
  return (
    <article className='bg-white border border-[#E9E3D8] rounded-2xl p-5 flex items-start gap-5'>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className='w-48 h-40 object-cover rounded-xl shrink-0'
        />
      )}
      <div className='flex-1 min-w-0'>
        <h3 className='text-xl font-semibold text-[#35483D] mb-3'>{title}</h3>
        <h4 className='font-semibold mb-2'>Ingredients</h4>
        <ul className='list-disc list-inside space-y-1'>
          {ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        {author && (
          <em className='block mt-4 text-sm text-gray-500'>
            by <User id={author} />
          </em>
        )}
      </div>
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.string,
  imageUrl: PropTypes.string,
}
