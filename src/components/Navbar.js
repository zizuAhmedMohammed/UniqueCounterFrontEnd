import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Unique Word Counter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{}}>
            <Nav.Link href="#link">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                PDF word counter
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Image word counter
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Document counter
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">other docs</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Contact us" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://www.linkedin.com/in/abdulaziz-ahmed-96a4b9224/">
                Abdulaziz Ahmed
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.linkedin.com/in/eyerusalem-mesfin-778192224">
                Eyerusalem Sileshi
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
