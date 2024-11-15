import { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function MainPage() {
  const [wishesCount, setWishesCount] = useState(null);

  async function getWishesCount() {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/wishes/statistics`
    );
    if (response.status === 200) {
      // console.log('count response', response);
      setWishesCount(response.data.count);
    }
  }
  useEffect(() => {
    getWishesCount();
  }, []);

  return (
    <Fragment>
      <Container className="text-center">
        <Row>
          <Col>
            <h1 className="ls-tight font-bolder display-3 mb-7">
              Wish{' '}
              <span className="d-inline-block py-1 bg-success">everything</span>{' '}
              you want
            </h1>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <p className="lead mb-2">
              Your personal platform for creating wishes.
            </p>
            <p className="lead mb-2">
              With our service, you can easily create a wish list and share it
              with anyone.
            </p>
          </Col>
        </Row>
        <Row className="d-flex ">
          <Col>
            <Link
              to="/wishes"
              className="btn btn-primary btn-lg mx-auto rounded-pill main-btn"
              style={{ maxWidth: 500 + 'px' }}
            >
              Create a wishlist
            </Link>
          </Col>
        </Row>
        {wishesCount ? (
          <Row className="my-5">
            <Col>
              <p className="fs-3">
                People have already made{' '}
                <span className="fw-bold">{wishesCount}</span> wishes with us
              </p>
            </Col>
          </Row>
        ) : null}
      </Container>
    </Fragment>
  );
}

export default MainPage;
