import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const NewAgenda = () => {

    const [agendaData, setAgendaData] = useState({
      agenda_slug: '',
      full_name: '',
      email: '',
      address: '',
      phone: ''
    });
    const navigate = useNavigate()



    const handleChange = (event) => {
        setAgendaData({ ...agendaData, [event.target.name]: event.target.value });
      };
    
    // Estructura del POST
    const post = () => {
      const postConfig = {
        method: 'POST',
        body: JSON.stringify(agendaData),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      fetch(`https://assets.breatheco.de/apis/fake/contact/`, postConfig)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error creating agenda');
          }
        })
        .then((data) => {
          if (data.agenda_slug === agendaData.agenda_slug) {
            alert(`${data.agenda_slug}  has been successfully created / A new contact has been added to ${data.agenda_slug}.`);
          } else {
            alert(`${data.agenda_slug} already exists!`);
          }
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    };
    
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(agendaData.agenda_slug);
        post();
      };
    // Acaba el POST y el envío de los datos

  return (
    <div className='container2'>
        
        <div className='box2'>
          <div className='row mb-4'>
              <h1>Create your agenda / Add a contact </h1>
          </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="agenda_slug" className="form-label ">Agenda Slug</label>
                    <input type="text" className="form-control fc2" id="agenda_slug" name='agenda_slug' placeholder='ej: user123' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">Name </label>
                    <input type="text" className="form-control fc2" id="full_name" name='full_name' placeholder="My Agenda's Name" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control fc2" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange} />
                  <div id="emailHelp" className="form-text"><p>We'll never share your email with anyone else.</p></div>
                </div>

                

                <div className="mb-3">
                    <label htmlFor="address" className="form-label fc2">Address</label>
                    <input type="text" className="form-control" id="address" name='address' onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label fc2">Phone number</label>
                    <input type="number" className="form-control" id="phoneNumber" name='phone' onChange={handleChange} />
                </div>

                <div className='text-center mt-4'>
                  <button type="submit" className="btn btn-primary btnp">Guardar contacto</button>
                </div>
            </form>
        </div>

    </div>
  )
}
