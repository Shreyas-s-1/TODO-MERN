import { useState } from "react";
import axios from 'axios'
import './app.css'
export default function Create(){

const[task,setTask]=useState("");

function handelSubmit(){

    axios.post('http://localhost:2000/add',{task:task})
    .then((result)=>{location.reload()})
}
  return (
    <div className="create-container">
      <input 
        type="text" 
        placeholder="Add a new task..." 
        className="create-input"
        onChange={(e) => setTask(e.target.value)}
      />
      <button 
        type="button" 
        className="create-btn" 
        onClick={handelSubmit}
      >
        Add Task
      </button>
    </div>
  );
}