import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../api/axiosInstance';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { setUser } = useOutletContext();
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    // очищаем форму
    setFormData({
      email: '',
      password: '',
    });

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/auth/login`,
        formData
      );
      if (response.status === 200) {
        setUser(response.data.user);
        console.log('set user in login page');
        setAccessToken(response.data.accessToken);
        navigate('/wishes');
      }
    } catch (err) {
      setServerErrorMessage(err.response.data.message);
    }
  };

  return (
    <Container>
      <Form
        onSubmit={loginHandler}
        className="d-flex flex-column m-auto"
        style={{ maxWidth: '700px' }}
      >
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            className="rounded-pill p-3"
            type="email"
            name="email"
            placeholder="Enter e-mail"
            onChange={changeHandler}
            value={formData?.email}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="rounded-pill p-3"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={changeHandler}
            value={formData?.password}
            required
          />
        </Form.Group>
        {serverErrorMessage && (
          <div className="my-3 text-danger">{serverErrorMessage}</div>
        )}
        <Button
          variant="primary"
          type="submit"
          className="btn-lg rounded-pill m-auto w-100"
        >
          Login
        </Button>
        <Row className="mt-3 text-center">
          <Col>
            <p className="m-0">
              Don&apos;t have an account?
              <Link to="/register" className="mx-3">
                Register
              </Link>
            </p>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default LoginPage;
