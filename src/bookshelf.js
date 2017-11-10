import React from 'react'

import Book from './book'

function Bookshelf (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {props.books.map((book) => ( 
          <Book book={book} onChangeBookshelf={props.onChangeBookshelf}/>
        ))}
        </ol>
      </div>
    </div>
  );
}

export default Bookshelf
