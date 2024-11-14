import { Fragment, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../api/axiosInstance';
import WishModalForm from '../ui/WishModalForm';

function WishesPage() {
  const [wishes, setWishes] = useState([]);
  const [currentEditWish, setCurrentEditWish] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  async function fetchWishes() {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/wishes`
    );
    // console.log('response-response', response);

    if (response.status === 200) {
      setWishes(response.data);
    } else {
      setWishes([]);
    }
  }

  useEffect(() => {
    fetchWishes();
  }, []);

  const createWishHandler = async (data) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/wishes`,
      data
    );
    setShowCreateModal(false);
    if (response.status === 201) {
      await fetchWishes();
    }
  };

  const setEditWishHandler = (wish) => {
    setCurrentEditWish(wish);
    setShowEditModal(true);
  };

  const updateCurrentWishHandler = async (newData) => {
    if (!currentEditWish) {
      return;
    }
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API}/wishes/${currentEditWish.id}`,
      newData
    );
    setShowEditModal(false);
    if (response.status === 200) {
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

  return (
    <Container>
      <h1 className="text-center mb-5">My wishlist</h1>
      <h2 className="text-center text-decoration-underline mb-5">
        Wishes waiting to be fulfilled
      </h2>
      {wishes.map((wish) => (
        <Fragment key={wish.id}>
          <Row>
            <Col xs={12} md={6}>
              <p>{wish.name}</p>
              <p>{wish.description}</p>
              <p>{wish.price}</p>
            </Col>
            <Col
              xs={12}
              md={6}
              className="d-flex justify-content-center justify-content-md-end align-items-center"
            >
              <Button
                className="btn-new btn-lg p-2 me-3"
                style={{
                  maxWidth: '100px',
                  width: '100%',
                }}
                onClick={() => deleteWishHandler(wish.id)}
              >
                Delete
              </Button>
              <Button
                className="btn-new btn-lg p-2"
                style={{ maxWidth: '100px', width: '100%' }}
                onClick={() => setEditWishHandler(wish)}
              >
                Edit
              </Button>
            </Col>
          </Row>

          <hr />
        </Fragment>
      ))}

      <h2 className="text-center text-decoration-underline my-5">
        Wishes already fulfilled
      </h2>

      <Button
        className="btn-new btn-lg d-flex flex-column align-items-center p-4 m-auto position-fixed bottom-0 start-50 mb-5"
        style={{
          transform: 'translate(-50%)',
        }}
        onClick={() => setShowCreateModal(true)}
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

      {showEditModal ? (
        <WishModalForm
          title="What do you want to edit?"
          action="Update"
          onModalClose={() => setShowEditModal(false)}
          data={currentEditWish}
          onFormSubmit={updateCurrentWishHandler}
        />
      ) : null}

      {showCreateModal ? (
        <WishModalForm
          title="What do you want to add?"
          action="Create"
          onModalClose={() => setShowCreateModal(false)}
          onFormSubmit={createWishHandler}
        />
      ) : null}
    </Container>
  );
}

export default WishesPage;
