import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, Outlet} from 'react-router-dom';
import DoctorsCrud from './DoctorsCrud';

function MenuAdm(){
    return(
        <>
        <Navbar bg="dark" variant='dark'>
            <Container>
                <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link as={Link} to="">Welcome</Nav.Link>
                    <Nav.Link as={Link} to="DoctorsCrud">Doctors Admin</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <section>
           <Container>
            <Outlet>
            </Outlet>
            </Container> 
        </section>
        </>
    );
}

export default MenuAdm;