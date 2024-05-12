import { useContext } from "react";

import { CounterContext } from "../context/CounterContext";

import React from 'react'

function ChangeCounter() {

    const { counter, setCounter } = useContext(CounterContext)

    return (
        <div>
            <button onClick={() => setCounter(counter + 1)}>
                Add value Counter
            </button>
            {/* <p>Valor do contados: {counter}</p> */}
        </div>
    )
}

export default ChangeCounter