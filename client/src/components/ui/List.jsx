import { Fragment } from 'react';

function List({ data, setData }) {
  return (
    {data.length
        ? (data.map((el) => (

            <Fragment key={el.id}>
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
          )))
        : (null)}

  )
}

export default List


