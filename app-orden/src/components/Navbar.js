
import LOGO from '../assets/images/LOGO.png';

function Navbar() {
  
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-warning">
  <div className="container-fluid">
    <a className="navbar-brand" href="/usuarios">
    <img src={LOGO} alt="" width="30" height="24" class="d-inline-block align-text-top"/>
      TRACKER X
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>
  );
}

export default Navbar;
