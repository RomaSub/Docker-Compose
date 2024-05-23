import { Form, InputGroup, Button } from 'react-bootstrap';

interface InputChatProps {
  value: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputChat: React.FC<InputChatProps> = ({
  value,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            id="message"
            type="text"
            aria-label="Новое сообщение"
            placeholder="Сообщение"
            value={value}
            onChange={handleChange}
            autoFocus
            required
            autoComplete="off"
          />
          <Button
            id="b-send"
            type="submit"
            variant="primary"
            disabled={!value.trim()}
          >
            Отправить
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputChat;
