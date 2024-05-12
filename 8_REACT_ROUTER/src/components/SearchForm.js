import React from 'react'

import { useNavigate } from 'react-router'
import { useState } from 'react'

function SearchForm() {

    const navigate = useNavigate()
    const [query, setQuery] = useState()

    const handleSubmit = (e) =>{
        e.preventDefault()
        navigate("/search?q=" + query)
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setQuery(e.target.value)}></input>
        <input type='submit' value="Buscar"></input>
    </form>
  )
}

export default SearchForm