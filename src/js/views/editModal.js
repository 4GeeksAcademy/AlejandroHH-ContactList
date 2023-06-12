import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';

export const EditModal = ({ contactId }) => {
  const [showModal, setShowModal] = useState(false);
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(data);

    await actions.editContact(contactId, data);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={openModal}>
        <FontAwesomeIcon icon={faGear} />
      </button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
          <label>Agenda_slug:</label>
            <input className="form-control" name="agenda_slug" type="text" onChange={handleChange} />

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
