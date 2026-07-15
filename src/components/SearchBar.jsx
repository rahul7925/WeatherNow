import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const city = query.trim()
    if (!city) return
    onSearch(city)
  }

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
      role="search"
      aria-label="City search"
    >
      <FiSearch className="search-bar__icon" aria-hidden="true" />
      <input
        id="city-input"
        type="text"
        className="search-bar__input"
        placeholder="Search any city — London, Tokyo, New York…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="City name"
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="search-bar__btn"
        disabled={isLoading || !query.trim()}
        aria-label="Search weather"
      >
        {isLoading ? 'Searching…' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
