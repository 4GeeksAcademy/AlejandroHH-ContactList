import React, {useState, useEffect, useContext}  from 'react'
import { NewAgenda } from './newAgenda'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {Context} from '../store/appContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons'
import { EditModal } from './editModal'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export const SingleAgenda = () => {
    const [contacts, setContacts] = useState([]);
   // const [src, setSrc] = useState([]);
    const { agendaId } = useParams();
    const { actions } = useContext(Context)
    const navigate = useNavigate()


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

    // const handleDelete = (contactId) => {
    //   const deleteConfig = {
    //     method: 'DELETE',
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   };
    
    //   fetch(`https:/assets.breatheco.de/apis/fake/contact/${contactId}`, deleteConfig)
    //     .then((resp) => {
    //       if (!resp.ok) {
    //         throw new Error('Something went wrong...');
    //       }
    //       alert('Contact deleted successfully');
    //       window.location.reload();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // };

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

   const deleteConfig = {
    method: 'DELETE',
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application.json"
    }

  }

  



    
    return (
        <>
            <div className='container'>
                <div className='row'>                    
                    {/* <h1>Agenda de {contacts?.agenda_slug}</h1> */}
                    

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

                                <button onClick={() => {
                                    
                                      
                                      fetch(`https://assets.breatheco.de/apis/fake/contact/${contact.id}`, deleteConfig)
                                      .then((resp) => {
                                        if(!resp.ok){
                                          throw new Error('Something went wrong...')
                                        } else{
                                            alert('Contact deleted successfully')
                                            window.location.reload();
                                        }
                                        
                                  
                                      })
                                      .catch((e) => {
                                        console.log(e)
                                      })
                                }}><FontAwesomeIcon icon={faTrash} /></button>




                                

                              

                            </div>

                        </div>
                    ))}
                </div>
                <div className='col-12 text-center'>
                    <button className="btn btn-danger btnt" onClick={() => {
                      const agendaSlug = contacts[0]?.agenda_slug; 
                      fetch(`https://assets.breatheco.de/apis/fake/contact/agenda/${agendaSlug}`, deleteConfig)
                        .then((resp) => {
                          if (!resp.ok) {
                            throw new Error('Something went wrong...');
                          } else {
                            alert(`${contacts[0]?.agenda_slug}'s agenda deleted successfully!`);
                            navigate('/agendas')
                          }
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}> Delete agenda 
                    </button>
                </div>

                
            </div> 
                
        </>
      );
    };
