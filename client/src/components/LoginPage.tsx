import { Stack, Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

interface Fields {
  username: string;
  room: string;
}

const LoginPage = () => {
  const [values, setValues] = useState<Fields>({ username: '', room: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value.trim() });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/chat?name=${values.username}&room=${values.room}`, {
      replace: false,
    });
  };

  return (
    <Container
      style={{
        marginTop: '200px',
        width: '300px',
        padding: '20px',
        borderRadius: '8px',
        color: 'white',
      }}
    >
      <h3 style={{ textAlign: 'center' }}>Чат</h3>
      <br />
      <Form onSubmit={handleSubmit}>
        <Stack gap={1}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              name="username"
              onChange={handleChange}
              type="text"
              placeholder="Имя"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRoom">
            <Form.Control
              name="room"
              onChange={handleChange}
              type="text"
              placeholder="Комната"
            />
          </Form.Group>
          <Button
            disabled={!values.username || !values.room}
            variant="primary"
            type="submit"
            style={{ width: '100%' }}
          >
            Начать
          </Button>
        </Stack>
      </Form>
    </Container>
  );
};

export default LoginPage;
