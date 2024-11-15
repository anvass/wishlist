import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function WishList({ wishes, onDelete, onUpdate, onToggleComplete }) {
  return (
    <Container className="wishes">
      {wishes.map((wish) => (
        <Row key={wish.id} className="py-3">
          <Col
            xs={12}
            md={6}
            className="d-flex align-items-center mb-3 mb-md-0"
          >
            <Button
              className="me-3 d-flex rounded-pill completedBtn"
              variant="outline-primary"
              onClick={() => onToggleComplete(wish)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                height="100%"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Button>
            <div>
              <p>{wish.name}</p>
              <p>{wish.description}</p>
              <p className="m-0">{wish.price}</p>
            </div>
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
              onClick={() => onDelete(wish.id)}
            >
              Delete
            </Button>
            <Button
              className="btn-new btn-lg p-2"
              style={{ maxWidth: '100px', width: '100%' }}
              onClick={() => onUpdate(wish)}
            >
              Edit
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

WishList.propTypes = {
  wishes: PropTypes.array,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  onToggleComplete: PropTypes.func,
};

export default WishList;
