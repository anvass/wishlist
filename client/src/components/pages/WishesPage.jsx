import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../../api/axiosInstance';
import Form from 'react-bootstrap/Form';

function WishesPage() {
  const [wishes, setWishes] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  async function fetchWishes() {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/wishes`
    );
    console.log('response-response', response);

    if (response.status === 200) {
      setWishes(response.data);
    } else {
      setWishes([]);
    }
  }

  useEffect(() => {
    fetchWishes();
  }, []);

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addWishHandler = async (e) => {
    e.preventDefault();
    // очищаем форму
    setFormData({
      name: '',
      description: '',
      price: '',
    });

    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/wishes`,
      formData
    );
    setShow(false);
    if (response.status === 201) {
      await fetchWishes();
    }
  };

  const deleteWishHandler = async (wishId) => {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API}/wishes/${wishId}`
    );
    if (response.status === 200) {
      await fetchWishes();
    }
  };

  const showModalHandler = () => setShow(true);
  const closeModalHandler = () => setShow(false);

  return (
    <Fragment>
      <Container>
        <h2>My wishlist</h2>
        {wishes.map((wish) => (
          <Fragment key={wish.id}>
            <div>
              <p>{wish.name}</p>
              <p>{wish.description}</p>
              <p>{wish.price}</p>
            </div>
            <Button
              className="btn-new btn-lg d-flex flex-column align-items-center p-2 m-auto"
              onClick={() => deleteWishHandler(wish.id)}
            >
              Delete
            </Button>
            <Button className="btn-new btn-lg d-flex flex-column align-items-center p-2 m-auto">
              Edit
            </Button>
            <hr />
          </Fragment>
        ))}
        <Button
          className="btn-new btn-lg d-flex flex-column align-items-center p-4 m-auto"
          onClick={showModalHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="mb-3"
          >
            <path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
          </svg>
          <span>New wish</span>
        </Button>
      </Container>

      <Modal show={show} onHide={closeModalHandler} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to add?</Modal.Title>
          {/* <CloseButton className="btn-close-white" /> */}
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column" onSubmit={addWishHandler}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="rounded-pill p-3"
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData?.name}
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
                value={formData?.description}
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
                value={formData?.price}
                onChange={changeHandler}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="btn-lg rounded-pill"
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Fragment>
  );
}

export default WishesPage;
