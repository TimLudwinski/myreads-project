import React from 'react'

import Book from './book'

//
function Bookshelf (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {props.books.map((book) => ( 
          <Book title={book.title} author={book.authors.join(", ")} image={`url(${book.imageLinks.thumbnail})`} shelf={book.shelf}/>
        ))}
        </ol>
      </div>
    </div>
  );
}

export default Bookshelf
