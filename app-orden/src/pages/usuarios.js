import React, { useEffect, useState } from 'react';
import '../assets/css/orden.css';
import { getUsuarios } from '../services/apiRest.js';
import {Table} from 'react-bootstrap-v5';
import {useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';
import LOGO from '../assets/images/LOGO.png';
import Pagination from '../components/Pagination.js';


function Usuarios () {

    const location = useLocation();
    const [users, setUsers] = useState([]); 
    const token = location.state.tokenO;
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
 
 
  
     useEffect(() =>{
       async function cargarUsuarios(){
           const response = await getUsuarios(token);
           console.log(response.data);
           setUsers(response.data);
       }
       cargarUsuarios();
     }, [token]);
       
     //console.log(ordenes[1].nombreCliente + "ordenes");
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = users.slice(indexOfFirstPost,indexOfLastPost);
    //PAGINACION
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


       return (
       <>
       <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <div className="container-fluid">
            <a className="navbar-brand" href="/orden">
            <img src={LOGO} alt="" width="30" height="24" class="d-inline-block align-text-top"/>
              TRACKER X
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link" aria-current="page" href="/usuarios">Usuarios</a>
                <Link className="nav-link" to={"/orden"} state={{token:token}}>Ordenes</Link>
              </div>
            </div>
            <form class="d-flex">
              <Link to={"/"} class="btn btn-outline-dark" type="submit">Cerrar Sesión</Link>
            </form>
          </div>
        </nav>
       <div className='container my-5'>
       <Table className='table table-dark table-hover table-bordered align-middle table-responsive'>
         <thead>
             <tr>
                 <th>Usuario</th>
                 <th>Contraseña</th>
                 <th>Distribuidor</th>
             </tr>
         </thead>
         <tbody>       
                 {currentPosts.map(currentPosts => (
                 <tr className='table-light'>
                      <td>{currentPosts.name}</td>
                      <td>{currentPosts.password}</td>
                      <td>{currentPosts.organizacion}</td>
                 </tr>
                 ))}
            
         </tbody>
        </Table>  
        <Pagination postPerPage={postPerPage} totalPosts={users.length} paginate={paginate}></Pagination>
       </div>
       </> 
       );
}

export default Usuarios;