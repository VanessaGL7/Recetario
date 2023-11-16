import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, Outlet} from 'react-router-dom';

function Menu(){
    return(
        <>
        <Navbar bg="dark" variant='dark'>
            <Container>
            <Navbar.Brand href='#home'><img src="https://png.pngtree.com/png-vector/20190129/ourmid/pngtree-vector-medicines-icon-png-image_426810.jpg" alt="Logo"     style={{ width: '50px', height: '50px', borderRadius: '50%' }}
 />
            Main</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link as={Link} to="">Home</Nav.Link>
                    <Nav.Link as={Link} to="Register">Register</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <section className="login-container"
      style={{
        backgroundImage: 'url("https://media0.giphy.com/media/ccKEsBDAAQTrutQ9LA/giphy.gif?cid=ecf05e47fyxzl2ak0f6maukyce8favh7jj1e0hwtv11x02du&ep=v1_gifs_search&rid=giphy.gif&ct=g")',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }} >
           <Container >
            <Outlet>
            </Outlet>
            </Container> 
        </section>
        </>

    );
}

export default Menu;