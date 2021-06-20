import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Table,Modal,ModalBody,ModalHeader} from 'reactstrap';
import axios from 'axios';

const Form = (props) => {
  const [name,setName] = useState(props.name);
  const [description,setDescription] = useState(props.description);
  const [status,setStatus] = useState(props.status);
  const [duration,setDuration] = useState(props.duration);
  const submitHandler = (e) => {
    e.preventDefault();
    let url = props.url;
    let data = {
      project_name:name,
      description:description,
      status:status,
      duration:duration
    }
    if(props.isUpdate){
    axios.put(url,data)
      .then(res => console.log(res));
      window.location.reload();
        }else{
          axios.post(url,data)
      .then(res => console.log(res));
        window.location.reload();
        } 
  };
  return (
    <form onSubmit={submitHandler}>
    <div className="form-group mb-1">
      <label htmlFor="name">Project Name</label>
      <input id="name" name="name" type="text" onChange={(e)=>{setName(e.target.value)}} value={name} />
    </div>
    <div className="form-group mb-1">
      <label htmlFor="description">Description</label>
      <input id="description" name="description" type="text" onChange={(e)=>{setDescription(e.target.value)}} value={description} />
    </div>
    <div className="form-group mb-1">
      <label htmlFor="status">Project Status</label>
      <input id="status" name="status" type="text" onChange={(e)=>{setStatus(e.target.value)}} value={status} />
    </div>
    <div className="form-group mb-1">
      <label htmlFor="duration">Project Duration</label>
      <input id="duration" name="duration" type="number" onChange={(e)=>{setDuration(e.target.value)}} value={duration} />
    </div>
    <div className="form-group text-center">
      <button type="submit" className="btn btn-primary">
          Create
      </button>

    </div>
</form>
  );
}

const Projects = () => {
  const url = "/projects"
  const [projects,setProjects] = useState(null);
  const [modal,setModal] = useState(false);

  const [name,setName] = useState(null);
  const [description,setDescription] = useState(null);
  const [status,setStatus] = useState(null);
  const [duration,setDuration] = useState(null);
  const [newUrl,setNewUrl] = useState(null)
  const [isUpdate,setIsUpdate] = useState(false);
  const toggle = () => {
    setModal(!modal);
  }
  useEffect(()=>{
    axios.get(url)
    .then(response => {setProjects(response.data)})
        .catch(error => {
            
            console.error('There was an error!', error);
        });
  },[]);
  console.log(projects);
  return (
    <div className="container-fluid">
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Create New Project</ModalHeader>
        <ModalBody>
          <Form name={name} description={description} duration={duration} status={status} url={newUrl} isUpdate={isUpdate} />
        </ModalBody>
      </Modal>
      <div className="row">
        <div className="col">
        <Table responsive hover style={{width:"100%"}}>
                  <tbody>
               <tr>

            <Link>
            <th scope="row">#</th></Link>
            <td >project_name</td>
            <td >status</td>
            <td >Delete</td>
            <td >Update</td>
          
           
           </tr>
           </tbody>
           </Table>
    {projects?(
        <>
          {projects.map((item)=>{
              return (
                <Table responsive hover style={{width:"100%"}}>
                  <tbody>
               <tr>
            
            <Link to={`/projects/${item.project_id}`}>
            <th scope="row">{item.project_id}</th>
            </Link>
            <td >{item.project_name}</td>
            <td >{item.status}</td>
            <td><button onClick={()=>{
              axios.delete(`/projects/${item.project_id}/update`)
              .then(res => {  
                window.location.reload();

              })  
            }}>Delete</button></td>
            <td><button onClick={()=>{
              setName(item.project_name);
              setDuration(item.duration);
              setStatus(item.status);
              setDescription(item.description);
              setNewUrl(`/projects/${item.project_id}/update/`);
              setIsUpdate(true);
              setModal(!modal);
              }  
            }>Update</button></td>
           
           </tr>
           </tbody>
           </Table>
            )
        })}
        </>
      ):(<div>No projects Found</div>)}
          <div className="justify-content-center">
            <button style={{marginLeft:"50%"}} onClick={()=>{
              setNewUrl('/projects/');
              setIsUpdate(false);
              setModal(!modal);
            }}>Add New Project</button>
          </div>
  
      

        </div>

      </div>
      
    </div>
  );
}

export default Projects;
