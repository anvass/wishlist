import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

function MainPage() {
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
              className="btn btn-lg mx-auto rounded-pill"
              style={{ maxWidth: 500 + 'px' }}
            >
              Create a wishlist
            </Link>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default MainPage;
