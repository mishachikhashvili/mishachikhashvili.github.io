import React, {useState, useReducer, useMemo} from 'react';
import ToDoItem from './ToDoItem';

const initialState = [];

function todoReducer(state, action){
   switch (action.type) {
      case "ADD_TODO":
         return [...state, {id: crypto.randomUUID(), text: action.payload, completed: false}]

      case "TOGGLE_TODO":
         return state.map(todo => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)

      case "DELETE_TODO":
         return state.filter(todo => todo.id !== action.payload)
   
      default:
         return state;
   }
}

export default function ToDoList() {
   const [input, setInput] = useState("");
   const [todos, dispatch] = useReducer(todoReducer, initialState);

   console.log([todos]);
   

   function handleSubmit(evt){
      evt.preventDefault();
      if (input.trim()){
         dispatch({type: "ADD_TODO", payload: input.trim()});
         setInput("");
      }
   }

   function handleToggle(id){
      dispatch({type: "TOGGLE_TODO", payload: id})
   }

   function handleDelete(id){
      dispatch({type: "DELETE_TODO", payload: id})
   }

   const completedCount = useMemo(()=>{
      return todos.filter(todo => todo.completed).length;
   },[todos]);

  return (
    <div>
      <h1>Todo-Liste</h1>
      <form onSubmit={handleSubmit}>
         <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
         <button>Hinzufügen</button>
      </form>
      <ul>
         {todos.map(todo => (
            <ToDoItem 
               key={todo.id}
               todo={todo}
               onToggle={handleToggle}
               onDelete={handleDelete}
            />
         ))}
      </ul>
      <p>Erledigte Todos: {completedCount}</p>
    </div>
  )
}
