import PropTypes from 'prop-types'

export function RecipeFilter({ field, value, onChange }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`} className='font-semibold'>
        Filter by {field}:
      </label>
      <input
        type='text'
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='border rounded-lg p-2 w-48'
      />
    </div>
  )
}
RecipeFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
