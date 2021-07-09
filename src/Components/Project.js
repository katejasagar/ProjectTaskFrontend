import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table,Modal,ModalBody,ModalHeader} from 'reactstrap';

const Form = (props) => {
  const [name,setName] = useState(props.name);
  const [description,setDescription] = useState(props.description);
  
  const submitHandler = (e) => {
    e.preventDefault();
    let url = props.url;
    let data = {
      task_name:name,
      description:description,
      project_id:props.pid
    }
    if(props.isUpdate){
    axios.put(url,data)
      .then(res => console.log(res));
      props.toggle();
      //window.location.reload();
        }else{
          axios.post(url,data)
      .then(res => console.log(res));
      props.toggle();
       // window.location.reload();
        } 
  };
  return (
    <form onSubmit={submitHandler}>
    <div className="form-group mb-1">
      <label htmlFor="name">Task Name</label>
      <input id="name" name="name" type="text" onChange={(e)=>{setName(e.target.value)}} value={name} />
    </div>
    <div className="form-group mb-1">
      <label htmlFor="description">Description</label>
      <input id="description" name="description" type="text" onChange={(e)=>{setDescription(e.target.value)}} value={description} />
    </div>
   
    <div className="form-group text-center">
      <button type="submit" className="btn btn-primary">
          Create
      </button>

    </div>
</form>
  );
}

const Project = (props) => {
const url = `/projects/${props.match.params.pid}`;
  const [project,setProject] = useState(null);
  const [modal,setModal] = useState(false);
  const [task,setTask] = useState(null);
  const [name,setName] = useState(null);
  const [description,setDescription] = useState(null);
  const [newUrl,setNewUrl] = useState(null)
  const [isUpdate,setIsUpdate] = useState(false);
  const pid = props.match.params.pid;
  const toggle = () => {
    setModal(!modal);
  }
  useEffect(()=>{
    axios.get(url)

    .then(response => {
        setProject(response.data[0])
        setTask(response.data.slice(1))
    })
        .catch(error => {
            
            console.error('There was an error!', error);
        });
  },[]);
  console.log(project);
  console.log(task);
  return (
    <div className="container-fluid">
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Create New Project</ModalHeader>
        <ModalBody>
          <Form name={name} description={description} url={newUrl} isUpdate={isUpdate} pid={pid} toggle={toggle} />
        </ModalBody>
      </Modal>
    <div className="row">
      <div className="col">
     <h2>Project</h2>
     
    {project?(
      <>
    <h5>Project Name: {project.project_name}</h5>
    <h5>Project Description: {project.description}</h5>
    <h5>Project Status: {project.status}</h5>
    <h5>Project Duration: {project.duration}</h5>
    </>
    ):(<p></p>)}
    <br/>
    <h2>Tasks of Project {props.match.params.pid}: </h2>
    <br />
    <Table responsive hover style={{width:"100%"}}>
                  <tbody>
               <tr>
            
            
            <th scope="row">Task Id</th>
           
            <td >Task Name</td>
            <td>Task Description</td>
            <td>Taks Start Date</td>
            <td>Task end Date</td>
            <td>Delete</td>
            <td>Update</td>
           
           </tr>
           </tbody>
           </Table>
    {task?(
        <>
          {task.map((item)=>{
              return (
                <Table responsive hover style={{width:"100%"}}>
                  <tbody>
               <tr>
            
         
            <th scope="row">{item.task_id}</th>
           
            <td >{item.task_name}</td>
            <td>{item.description}</td>
            <td>{item.start_date}</td>
            <td>{item.end_date}</td>
            <td><button onClick={()=>{
              axios.delete(`/tasks/${item.task_id}/update/`)
              .then(res => {  
                window.location.reload();
              })  
            }}>Delete</button></td>
             <td><button onClick={()=>{
               setIsUpdate(true);
               setNewUrl(`/tasks/${item.task_id}/update/`);
               setName(item.task_name)
               setDescription(item.description);
               setModal(!modal);
            }}>Update</button></td>
           
           </tr>
           </tbody>
           </Table>
            )
        })}
        </>
      ):(<div>No task Found</div>)}
  <div className="justify-content-center">
            <button style={{marginLeft:"50%"}} onClick={()=>{
              setNewUrl('/tasks/');
              setIsUpdate(false);
              setModal(!modal);
            }}>Add New Task</button>
          </div>
    </div>
    </div>
    </div>
  );
}

export default Project;
