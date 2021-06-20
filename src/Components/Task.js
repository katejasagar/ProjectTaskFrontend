import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Task = () => {
const url = "/projects"
  const [projects,setProjects] = useState(null);
  console.log("jo");
  useEffect(()=>{
    axios.get(url)
    .then(response => {setProjects(response.data)})
        .catch(error => {
            
            console.error('There was an error!', error);
        });
  },[]);
  //console.log(projects);
  return (
    <div>
      hi
    </div>
  );
}

export default Task;
