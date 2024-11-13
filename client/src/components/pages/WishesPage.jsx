import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import axiosInstance from '../../api/axiosInstance';

function WishesPage() {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/wishes`)
      .then((res) => {
        setWishes(res.data);
      })
      .catch((err) => {
        console.error(err);
        setWishes([]);
      });
  }, [wishes]);

  return (
    <Container>
      <Button className="btn-new btn-lg d-flex flex-column align-items-center p-4 m-auto">
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
  );
}

export default WishesPage;
