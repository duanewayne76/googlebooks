import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
const apiKey = process.env.GOOGLE_API_KEY;
// import Cards from "../components/Cards";
require("dotenv").config();

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", description: "", image: "", link: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  saveBook = id => {
    API.saveBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      console.log(this.state.title)
      var url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.title}&key=${apiKey}`
      fetch(url).then(response => response.json()).then(data => {
        console.log(data)
        this.setState({ books: data.items })
      })
      // API.saveBook({
      //   title: this.state.title,
      //   author: this.state.author,
      //   description: this.state.description,
      //   image: this.state.image,
      //   link: this.state.link
      // })
      //   .then(res => this.loadBooks())
      //   .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Book Search</h1>
              <h2>Search for and Save Books of Interest</h2>
            </Jumbotron>
          </Col>

          <Col size="md-12">
            <div className="mainBody">
              <h1>Book Search</h1>
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <FormBtn
                  disabled={!(this.state.title)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Book
              </FormBtn>
              </form>

            </div>
          </Col>
          <Col size="md-12">
            <div className="mainBody">
              <h1>Results</h1>

              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book.id}>
                      {/* make a card component */}

                      <strong>
                        {book.volumeInfo.title} by {book.volumeInfo.authors}
                      </strong>
                      <p>
                        <span style={{ color: "red" }} >Description:</span> {book.volumeInfo ? book.volumeInfo.description : "No description available"}

                      </p>
                      <img className="img" src={book.volumeInfo.imageLinks.thumbnail} alt="Book Image" />

                      {/* <p>
                        <a style={{ color: "red" }} target="_blank" href={book.volumeInfo ? book.volumeInfo.infoLink : "#"}>More Details</a>
                      </p> */}

                      {/* <DeleteBtn onClick={() => this.deleteBook(book.id)} /> */}
                     
                        <p>
                          <a style={{ color: "red" }} target="_blank" href={book.volumeInfo ? book.volumeInfo.infoLink : "#"}><button className="save-btn" role="button" tabIndex="0">
                            View
                      </button></a> &nbsp;
                      <Link to={"/books/" + book.id}>
                      <button className="save-btn" role="button" tabIndex="0">
                            Save
                      </button>
                        
                      </Link>
                      </p>
                      {/* end component */}
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h5>No Results to Display</h5>
                )}
            </div>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
