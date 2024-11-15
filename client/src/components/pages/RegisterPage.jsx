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
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useOutletContext();

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
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/auth/register`,
        formData
      );

      if (response.status === 200) {
        setUser(response.data.user);
        console.log('set user on register page');
        setAccessToken(response.data.accessToken);
        navigate('/wishes');
      }
    } catch (err) {
      setServerErrorMessage(err.response.data.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={registerHandler} className="d-flex flex-column">
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="rounded-pill p-3"
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
        {serverErrorMessage && <div className="my-3">{serverErrorMessage}</div>}
        <Button variant="primary" type="submit" className="btn-lg rounded-pill">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterPage;
