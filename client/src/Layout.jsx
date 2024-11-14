import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axiosInstance, { setAccessToken } from './api/axiosInstance';

function Layout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Mount!');
    async function getUserData() {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API}/token/refresh`
      );
      // console.log(response);
      // console.log(response.data);
      setUser(response.data.user);
      console.log('set user in layout');
    }
    getUserData();
  }, []);

  const logoutHandler = async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/auth/logout`
    );
    console.log('logout response', response);
    if (response.status === 200) {
      setUser(null);
      setAccessToken('');
      //   setEntries([]);
      navigate('/');
    }
  };

  return (
    <Fragment>
      <Container>
        <Row className="d-flex align-items-center">
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center justify-content-md-start"
          >
            <Link to="/" className="d-flex my-3">
              <Image
                src="/public/assets/images/logo.svg"
                rounded
                className="w-100 justify-content-center justify-content-md-start flex-shrink-0"
                style={{ maxWidth: 120 + 'px' }}
              />
            </Link>
          </Col>
          <Col xs={12} md={8}>
            <Nav
              variant="pills"
              className="justify-content-center justify-content-md-end"
            >
              {user ? (
                <Fragment>
                  <Nav.Item className="d-flex align-items-center me-3 py-3">
                    <Link to="/profile" className="text-decoration-none">
                      {user.username}
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="d-flex align-items-center py-3">
                    <Button
                      variant="link"
                      className="text-decoration-none rounded-pill"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </Nav.Item>
                </Fragment>
              ) : (
                <Fragment>
                  <Nav.Item className="me-3 py-3">
                    <Link to="/register" className="text-decoration-none">
                      Register
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="py-3">
                    <Link to="/login" className="text-decoration-none">
                      Login
                    </Link>
                  </Nav.Item>
                </Fragment>
              )}
            </Nav>
          </Col>
        </Row>
      </Container>

      <Outlet context={{ user, setUser }} />

      <Container className="d-flex justify-content-center align-items-end">
        <Row>
          <Col>
            <p className="text-center m-0 p-3">&copy; All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Layout;
