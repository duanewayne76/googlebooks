import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    book: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                (React) Google Books Search
              </h1>
              <h2>Search for and Save Books of Interest</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
          <div className="mainBody">
        
        
            
              <h1>Saved Books</h1>
              <p>
                {this.state.book.synopsis}
              </p>
           
            </div>
          </Col>
        </Row>          
        <Row>
        
          <Col size="md-2">
            <Link to="/">← Back to Search</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
