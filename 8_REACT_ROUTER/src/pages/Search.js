import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

function Search() {
    const [searchParams] = useSearchParams()
    const url = 'http://localhost:3000/products?' + searchParams
    const{data: items, loading, error} = useFetch(url)
    
    return (
        <div>
            <h1>Resultados</h1>
            <ul className='products'>
                {items &&
                    items.map((item) => (
                        <li key={item.id}>
                            <h2>{item.name}</h2>
                            <h2>{item.price}</h2>

                            <Link to={`/products/${item.id}`}>Detalhes</Link>
                        </li>
                    ))}
            </ul>
        </div>


    )
}

export default Search