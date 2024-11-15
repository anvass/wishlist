import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import PropTypes from 'prop-types';

function WishModalForm({
  title,
  action,
  onModalClose,
  onFormSubmit,
  data = {},
}) {
  const [formData, setFormData] = useState(data);
  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <Modal show={true} onHide={onModalClose} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
        {/* <CloseButton className="btn-close-white" /> */}
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column" onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="rounded-pill p-3"
              type="text"
              name="name"
              placeholder="Enter name"
              defaultValue={formData.name}
              onChange={changeHandler}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="rounded p-3"
              name="description"
              placeholder="Enter description"
              defaultValue={formData.description}
              onChange={changeHandler}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>What&apos;s the price?</Form.Label>
            <Form.Control
              className="rounded-pill p-3"
              type="number"
              name="price"
              placeholder="Enter price"
              defaultValue={formData.price}
              onChange={changeHandler}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="btn-lg rounded-pill"
          >
            {action}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

WishModalForm.propTypes = {
  title: PropTypes.string,
  action: PropTypes.string,
  onModalClose: PropTypes.func,
  onFormSubmit: PropTypes.func,
  data: PropTypes.object,
};

export default WishModalForm;
