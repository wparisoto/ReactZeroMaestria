import {useParams} from "react-router-dom"

function Info() {
    const {id} = useParams()
  return (
    <div>Mais informações sobre o produto: {id}</div>
  )
}

export default Info