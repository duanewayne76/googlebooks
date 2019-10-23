import React from "react";
import "./style.css";

function Card() {
    return (
        <div className="card">
            <div className="img-container">
                <strong>
                    {book.volumeInfo.title} by {book.volumeInfo.authors}
                </strong>
                <p>
                    <span style={{ color: "red" }} >Description:</span> {book.volumeInfo ? book.volumeInfo.description : "No description available"}

                </p>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book Image" />

                <Link to={"/books/" + book.id}>
                    <p>
                        <a style={{ color: "red" }} target="_blank" href={book.volumeInfo ? book.volumeInfo.infoLink : "#"}>View:</a>
                    </p>
                </Link>
                <DeleteBtn onClick={() => this.deleteBook(book.id)} />
                <p>
                    <span className="save-btn" role="button" tabIndex="0">
                        +
                      </span>
                </p>
            </div>
            {/* <span onClick={() => props.removeFriend(props.id)} className="remove">
                𝘅
        </span> */}
        </div>
    );
}
export default Card;




