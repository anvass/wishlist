import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { useState } from 'react';
import axiosInstance, { setAccessToken } from '../../api/axiosInstance';
import { useNavigate, useOutletContext } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext();

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    // очищаем форму
    setFormData({
      username: '',
      email: '',
      password: '',
    });

    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/auth/register`,
      formData
    );

    console.log(response.data);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
    navigate('/');
  };

  return (
    <Container>
      <Form onSubmit={registerHandler} className="d-flex flex-column">
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter your name"
            onChange={changeHandler}
            value={formData?.username}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
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
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={changeHandler}
            value={formData?.password}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterPage;
