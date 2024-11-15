import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../api/axiosInstance';
import WishModalForm from '../ui/WishModalForm';
import WishList from '../ui/WishList';

function WishesPage() {
  const [waitingdWishes, setWaitingWishes] = useState([]);
  const [completedWishes, setCompletedWishes] = useState([]);

  const [currentEditWish, setCurrentEditWish] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  async function fetchWishes() {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/wishes`
    );

    if (response.status === 200) {
      const wishes = response.data;

      setWaitingWishes(wishes.filter((wish) => !wish.isCompleted));
      setCompletedWishes(wishes.filter((wish) => wish.isCompleted));
    } else {
      setWaitingWishes([]);
      setCompletedWishes([]);
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

  const toggleWishHandler = async (wish) => {
    console.log('toggle');
    const response = await axiosInstance.patch(
      `${import.meta.env.VITE_API}/wishes/${wish.id}`,
      { isCompleted: !wish.isCompleted }
    );
    console.log('toggle response', response);
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
      <WishList
        wishes={waitingdWishes}
        onUpdate={setEditWishHandler}
        onDelete={deleteWishHandler}
        onToggleComplete={toggleWishHandler}
      />
      <Button
        className="btn-new btn-lg d-flex flex-column align-items-center p-4 m-auto mb-5"
        style={{
          boxShadow: '0px 0px 15px 5px rgba(75,63,96,0.9)',
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
      <hr />
      <hr />
      <hr />
      <h2 className="text-center text-decoration-underline my-5">
        Completed wishes
      </h2>

      <WishList
        wishes={completedWishes}
        onUpdate={setEditWishHandler}
        onDelete={deleteWishHandler}
        onToggleComplete={toggleWishHandler}
      />

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
