import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import { useKeyword, useIncludedResults } from "../hooks/navbar";

function NavbarHeader() {
  const { keyword, setKeyword, handleKeyword, searchKeyword } = useKeyword();
  const includedResults = useIncludedResults(keyword);
  return (
    <Navbar expand="lg" className="nav-body">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="/monkey-ranky-logo2.png"
            alt="Logo"
            width="120"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="#action1">순위 비교</Nav.Link>
            <Nav.Link href="#action2">서비스 소개</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchKeyword}>
            <div className="searchForm">
              <Form.Control
                type="search"
                placeholder="종목명으로 검색해보세요."
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={handleKeyword}
              ></Form.Control>
              {includedResults.length > 0 && (
                <div className="includedSearchForm">
                  {includedResults.map((result, index) => (
                    <a
                      key={index}
                      className="included-result"
                      onClick={() => {
                        setKeyword(result);
                      }}
                    >
                      {result}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="outline-light"
              type="submit"
              className="search-button"
            >
              <img src="/search-icon.svg" alt="Search" width="20" />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
