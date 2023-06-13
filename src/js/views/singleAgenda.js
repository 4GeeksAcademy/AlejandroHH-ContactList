import React, {useState, useEffect, useContext}  from 'react'
import { NewAgenda } from './newAgenda'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {Context} from '../store/appContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons'
import { EditModal } from './editModal'

export const SingleAgenda = () => {
    const [contacts, setContacts] = useState([]);
   // const [src, setSrc] = useState([]);
    const { agendaId } = useParams();
    const { actions } = useContext(Context)

    useEffect(() => {
		actions.loadSrc(agendaId)
	}, [])



    useEffect(() => {
        fetch(`https://assets.breatheco.de/apis/fake/contact/agenda/${agendaId}`)
        .then((response) => response.json())
        .then((data) => {
            setContacts(data);

        })
        .catch((error) => {
            console.error(error)
        })
    }, [agendaId])

    const changeSex = () => {
         let randomNum = Math.random()
         if(randomNum < 0.5){
            return "men"
         } else{
            return "women"
         }
    }

    const changeId = () => {
        let randomNum = Math.floor(Math.random( )* 100)
        return randomNum;
   }



    
    return (
        <>
            <div className='container'>
                <div className='row'>                    
                    <h1>Agenda de {contacts?.agenda_slug}</h1>
                </div>
                <div className='row theContacts'>
                    {contacts.map((contact, index) => (
                        <div key={index} className='col-3 margins'>

                            <div className="card " style={{width: '18rem'}}>
                                
                                <img className="" style={{width: '5rem'}} src={`https://randomuser.me/api/portraits/med/${changeSex()}/${changeId()}.jpg`} alt="Card image cap" /> 
                                <p className='mb-3'>Agenda slug: <span className='slug'>{contact.agenda_slug}</span></p>

                                <h5 className="card-title">Name: <span>{contact.full_name}</span></h5>
                                <h5>Email: <span>{contact.email}</span></h5>
                                <h5>Phone: <span>{contact.phone}</span></h5>
                                <h5>Address: <span>{contact.address}</span></h5>

                                <EditModal contactId={contact.id} agenda_slug={contact.agenda_slug}/>

                                <button><FontAwesomeIcon icon={faTrash} /></button>




                                

                              

                            </div>

                        </div>
                    ))}
                </div>
            </div> 
                
        </>
      );
    };
