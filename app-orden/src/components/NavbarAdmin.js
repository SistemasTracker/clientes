import { Link } from 'react-router-dom';
import LOGO from '../assets/images/LOGO.png';

function NavbarComponentAdmin() {
  
  return (
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
        <a className="nav-link" aria-current="page" href="/orden">Ordenes</a>
      </div>
    </div>
    <form class="d-flex">
      <Link to={"/"} class="btn btn-outline-dark" type="submit">Cerrar Sesión</Link>
    </form>
  </div>
</nav>
  );
}

export default NavbarComponentAdmin;