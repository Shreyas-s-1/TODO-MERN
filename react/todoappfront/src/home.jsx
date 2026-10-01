import { useEffect, useState } from 'react';
import Create from './create';
import axios from 'axios';
import { BsCCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import './index.css'
export default function Home(){

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

 
  const handelEdit = (id) => {
    axios.put('http://localhost:2000/update/' + id)
      .then(result => {
       
        setTodos(prevTodos => 
          prevTodos.map(todo => 
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch(err => console.log(err));
  };


function handelDelete(id){
      axios.delete('http://localhost:2000/delete/' + id)
      .then(result=>{location.reload()})
}


return (
    <>
      <div className="todo-container">
        <h1 className="todo-title">To-Do App</h1>
        <div className="create-wrapper">
          <Create />
        </div>

        {todos.length === 0 ? (
          <div className="empty-state">
            <h2>Nothing here yet... Time to relax! ☕</h2>
          </div>
        ) : (
          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <div className="todo-action" onClick={() => handelEdit(todo._id)} title="Toggle completion">
                  {todo.done ? (
                    <BsFillCheckCircleFill className="icon-checked" />
                  ) : (
                    <BsCCircleFill className="icon-unchecked" />
                  )}
                </div>
                
                <p className={`todo-text ${todo.done ? "completed" : ""}`}>
                  {todo.task}
                </p>

                <button 
                  onClick={() => handelDelete(todo._id)} 
                  className="delete-btn"
                  title="Delete task"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )} 
      </div>
    </>
  );
}
