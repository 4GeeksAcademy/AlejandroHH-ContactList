import React, {useState, useEffect}  from 'react'
import { NewAgenda } from './newAgenda'
import { Link } from 'react-router-dom'
import { SingleAgenda } from './singleAgenda'


export const Agendas = () => {
    const [agendas, setAgendas] = useState([])
    const dataNewAgenda = {};

    useEffect(() => {
        fetch("https://assets.breatheco.de/apis/fake/contact/agenda")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setAgendas(data)
        })
        .catch(error => console.error(error))
    }, [])

    return (
        <div>
          {agendas.map((agenda, index) => (
            <div key={index}>
              <Link to={`/agendas/${agenda}`}>{agenda}</Link>
            </div>
          ))}
        </div>
      );
      
      
}
