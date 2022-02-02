import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./navbar.css";

function NavbarComp() {
  let history = useHistory();

  let submitHandler = (e) => {
    e.preventDefault();
    let word = e.target.search.value;
    e.currentTarget.reset();
    history.push(`/search-results?search=${word}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="movieflix" as={Link} to="/">
          MovFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="buttonLink" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="buttonLink" as={Link} to="/favoritos">
              Favorites ❤
            </Nav.Link>
          </Nav>
          <Form className="d-flex ms-auto" onSubmit={submitHandler}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
              name="search"
            />
            <Button className="searchButton" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
