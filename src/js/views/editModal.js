import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { useParams } from 'react-router';

export const EditModal = ({ contactId }) => {
  const [showModal, setShowModal] = useState(false);
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});
  const [id, setId] = useState([])
  const {agendaId} = useParams()

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };



  const openModal = () => {

    fetch(`https://assets.breatheco.de/apis/fake/contact/${contactId}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data)
      console.log(data)

    })
    .catch((error) => {
        console.error(error)
    })
    
    
    setShowModal(true);
  };
  

  // useEffect(() => {
  //   console.log(id); // Muestra el valor actual de id
  // }, [id]);

  



  const handleSubmit = (e) => {
    e.preventDefault()
    const putConfig = {
      method: 'PUT',
      body: JSON.stringify({
        "full_name": data.full_name,
        "email": data.email,
        "agenda_slug": data.agenda_slug,
        "address": data.address,
        "phone":data.phone
      }),
      headers: {
        "Content-Type": "application/json"
      }

    }
    fetch(`https://assets.breatheco.de/apis/fake/contact/${contactId}`, putConfig)
    .then((resp) => resp.json(id))
    .then((data) => {
      setData(data)
      window.location.reload();
    })
  }

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   console.log(data);

  //   await actions.editContact(contactId, data);
  // };



  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button type="button" className="btn btn-primary btnp"  onClick={openModal}>
        <FontAwesomeIcon icon={faGear} />
      </button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            

            <label>Name:</label>
            <input className="form-control" name="full_name" value={data.full_name} type="text" onChange={handleChange} />

            <label>Email:</label>
            <input className="form-control" name="email" type="text" value={data.email} onChange={handleChange} />

            <label>Address:</label>
            <input className="form-control" name="address" type="text" value={data.address} onChange={handleChange} />

            <label>Phone:</label>
            <input className="form-control" name="phone" type="text" value={data.phone} onChange={handleChange} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary btnp" type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
