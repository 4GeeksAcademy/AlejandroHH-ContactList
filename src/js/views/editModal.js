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

  useEffect(() => {
    fetch(`https://assets.breatheco.de/apis/fake/contact/agenda/${agendaId}`)
    .then((response) => response.json())
    .then((data) => {
        setId(data);
        console.log(data[0]?.full_name)

    })
    .catch((error) => {
        console.error(error)
    })
  }, [agendaId])


  const openModal = () => {
    // fetch(`https://assets.breatheco.de/apis/fake/contact/${contactId}`)
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setId(data.contact_id);
    //     console.log(id);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  
    setShowModal(true);
  };
  

  // useEffect(() => {
  //   console.log(id); // Muestra el valor actual de id
  // }, [id]);



  const handleSubmit = (e, cid) => {
    const putConfig = {
      method: 'PUT',
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application.json"
      }

    }
    fetch(`https://assets.breatheco.de/apis/fake/contact/${id[0].contact_id}`, putConfig)
    .then((resp) => resp.json(id))
    .then((data) => {
      setData(data)
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
      <button type="button" className="btn btn-primary"  onClick={openModal}>
        <FontAwesomeIcon icon={faGear} />
      </button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
          

            <label>Name:</label>
            <input className="form-control" name="full_name" type="text" onChange={handleChange} />

            <label>Email:</label>
            <input className="form-control" name="email" type="text" onChange={handleChange} />

            <label>Address:</label>
            <input className="form-control" name="address" type="text" onChange={handleChange} />

            <label>Phone:</label>
            <input className="form-control" name="phone" type="text" onChange={handleChange} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
