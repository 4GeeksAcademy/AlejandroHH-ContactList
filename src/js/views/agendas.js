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

    const scrollBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };

    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return (
      <div>
        <div>
          <button className='btn btnp ms-4' onClick={scrollBottom}>⬇️</button>
        </div>
        <h1 className='text-center mb-3'>AGENDAS</h1>
      
        <div className='contenedor text-center'>
          {agendas.map((agenda, index) => (
            <div className='agednaCard' key={index}>

                <div className="card-body">
                 
                  
                  <Link className='btn btn-primary btnp' to={`/agendas/${agenda}`}>Agenda of: {agenda}</Link>
                  
                </div>

              
            </div>
          ))}
        </div>
        <button className='btn btnp ms-4' onClick={scrollTop}>⬆️</button>

      </div>
      );
      
      
}
