import { useState } from 'react';

type Todo = {
  text: string;
  id: number;
};

type TodoListProps = {
  todos: Todo[];
  removeTodo: (id: number) => void;
};

const TodoList = ({ todos, removeTodo }: TodoListProps) => {
  return (
    <ul>
      {todos.map((el) => (
        <li key={el.id}>
          {el.text}
          <button onClick={() => removeTodo(el.id)}>X</button>
        </li>
      ))}
    </ul>
  );
};
const App = () => {
  const [todos, setTodos] = useState([] as Todo[]);
  const [text, setText] = useState('' as string);

  const addTodo = () => {
    if (text === '') return;
    const id = Date.now();
    const newTodo = { text, id };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const removeTodo = (id: number) => {
    const update = todos.filter((el) => el.id !== id);
    setTodos(update);
  };

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <TodoList todos={todos} removeTodo={removeTodo} />
    </>
  );
};

export default App;
