import React, { useEffect, useState } from 'react';
import '../assets/css/orden.css';
import {useLocation} from 'react-router-dom';
import { getOrden, getOrdenId, updateEstado } from '../services/apiRest.js';
import {Table} from 'react-bootstrap-v5';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import LOGO from '../assets/images/LOGO.png';
import Pagination from '../components/Pagination.js';

function VerOrden() {
   const location = useLocation();
   const [ordenes, setOrdenes] = useState([]); 
   const tokenO = location.state.token;
   const [selectedData, setSelectedData] = useState({});
   const [show, setShow] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [postPerPage] = useState(10);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const refresh = () => window.location.reload(true);

    useEffect(() =>{
      async function cargarOrdenes(){
          const response = await getOrden(tokenO);
         // console.log(response.data);
          setOrdenes(response.data);
      }
      cargarOrdenes();
    }, [tokenO]);
      
    const actualizarEstado = async (estado,id) =>{
      console.log(estado);
      const response = await updateEstado(estado,id,tokenO);
      console.log(response.data);
      refresh();
    }

    const showDetail = async (id) => {
      const response = await getOrdenId(id,tokenO);
      setSelectedData(response.data);
      handleShow();
     ;
    }

    //console.log(ordenes[1].nombreCliente + "ordenes");
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = ordenes.slice(indexOfFirstPost,indexOfLastPost);
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
                <Link className="nav-link" to={"/usuarios"} state={{tokenO:tokenO}}>Usuarios</Link>              
                <a className="nav-link" aria-current="page" href="/orden">Ordenes</a>                
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
                <th>Cliente</th>
                <th>Fecha de envío</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Detalles</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>       
                {currentPosts.map(currentPosts => (
                <tr className='table-light'>
                     <td>{currentPosts.nombreCliente}</td>
                     <td>{currentPosts.fecha}</td>
                     <td>{currentPosts.telefono1}</td>
                     { !currentPosts.estado ? <td className='table-active table-danger'>POR CREAR</td>:<td className='table-success'>CREADO</td>}
                     <td><Button className='btn btn-secondary' onClick={(e)=>showDetail(currentPosts.idordenTrabajo)}>VER DATOS</Button></td>
                     <td><button className='btn btn-success' onClick={(e)=>actualizarEstado(1,currentPosts.idordenTrabajo)}>CREAR</button></td>
                </tr>
                ))}
           
        </tbody>
       </Table>  
       <Pagination postPerPage={postPerPage} totalPosts={ordenes.length} paginate={paginate}></Pagination>
      </div>

      <Modal show={show} onHide={handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
        <Modal.Title>DATOS DEL CLIENTE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                  <Row>
                  <Col xs={6} md={4}>
                  <label className="form-label fw-bold">Nombre:</label> <label className="form-label"> {selectedData.nombreCliente}</label>
                  </Col>
                  <Col xs={6} md={4}>
                  <label className="form-label fw-bold">Dirección:</label> <label className="form-label"> {selectedData.direccion}</label>
                  </Col>
                  <Col xs={6} md={4}>
                  <label className="form-label fw-bold">Fecha de envío:</label> <label className="form-label"> {selectedData.fecha}</label>
                  </Col>
                  <Col xs={6} md={4}>
                  <label className="form-label fw-bold">Teléfono:</label> <label className="form-label"> {selectedData.telefono1}</label>
                  </Col>
                  <Col xs={6} md={4}>
                  <label className="form-label fw-bold">Teléfono:</label> <label className="form-label"> {selectedData.telefono1}</label>
                  </Col>
                  </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
     
      </>     
      );
    }
      


export default VerOrden