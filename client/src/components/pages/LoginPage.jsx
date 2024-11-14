import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../api/axiosInstance';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext();

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

    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/auth/login`,
      formData
    );

    console.log(response.data);
    setUser(response.data.user);
    console.log('set user in login page');
    setAccessToken(response.data.accessToken);
    navigate('/wishes');
  };

  return (
    <Container>
      <Form onSubmit={loginHandler} className="d-flex flex-column">
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
        <Button variant="primary" type="submit" className="btn-lg rounded-pill">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
