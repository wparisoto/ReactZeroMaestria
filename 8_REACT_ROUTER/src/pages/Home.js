import React from 'react'
import { Link } from "react-router-dom"
import { useFetch } from '../hooks/useFetch'
import "./Home.css"
// import ChangeCounter from '../components/ChangeCounter'
// import { useCounterContext } from '../hooks/useCounterContext'
import { useTitleColorContext } from '../hooks/useTitleColorContext'

const Home = () => {

    const url = 'http://localhost:3000/products'

    const { data: items, loading, error } = useFetch(url)

    // const {counter} = useCounterContext()
    const { color, dispatch } = useTitleColorContext()

    const setTitleColor = (color) => {
        dispatch({type: color})
    }

    return (
        <div>
            <h1 style={{ color: color }}>Produtos</h1>

            <div>
                <button onClick={() => setTitleColor("RED")}>RED</button>
                <button onClick={() => setTitleColor("BLUE")}>BLUE</button>
            </div>

            {error && <p>{error}</p>}
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

            {/* <p>Valor do contador Counter Context: {counter}</p>
            <ChangeCounter></ChangeCounter>             */}
            
        </div>
    )
}

export default Home