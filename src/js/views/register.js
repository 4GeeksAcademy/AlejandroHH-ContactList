import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const Register = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/contact/agenda")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const post = () => {
    const postConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`https://assets.breatheco.de/apis/fake/contact/`, postConfig)
      .then((response) => response.json())
      .catch((error) => console.error(error))
      .then((response) => navigate("/"));
      alert('HOLA')
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    post();
  };
  



  return (
    <div className='container'>
      <h1 className='mb-3'>New Agenda</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">Name </label>
          <input type="text" className="form-control" id="full_name" name='full_name' placeholder='My Full Name / My Agenda Name' onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange} />
          <div id="emailHelp" className="form-text"><p>We'll never share your email with anyone else.</p></div>
        </div>

        <div className="mb-3">
          <label htmlFor="agenda_slug" className="form-label">Agenda Identifier</label>
          <input type="text" className="form-control" id="agenda_slug" name='agenda_slug' placeholder='@example' onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name='address' onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone number</label>
          <input type="number" className="form-control" id="phoneNumber" name='phone' onChange={handleChange} />
        </div>

        <div className="mb-3 form-check">
          <input disabled type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleChange} />
          <label className="form-check-label" htmlFor="exampleCheck1">Upcoming favorites feature</label>
        </div>
        <button type="submit" className="btn btn-primary">Guardar contacto</button>
      </form>
    </div>
  );
};
