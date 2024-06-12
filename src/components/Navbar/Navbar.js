import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { useState } from "react";
import { getSearchResult } from "./apis/NavbarApi";

function NavbarHeader() {
  const [keyword, setKeyword] = useState("");
  // const navigate = useNavigate();

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const searchKeyword = async (event) => {
    event.preventDefault();
    const searchResult = await getSearchResult(keyword);
    console.log(searchResult.code);
    // navigate(`/detail?keyword=${searchResult.code}`); // 추후 router로 페이지 이동 작성
  };

  return (
    <Navbar expand="lg" className="nav-body">
      <Container fluid>
        <Navbar.Brand href="#">
          {/* public 디렉토리의 monkey-ranky-logo2.png 가져오기*/}
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
            <Form.Control
              type="search"
              placeholder="종목명으로 검색해보세요."
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={handleKeyword}
            />
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
