import React from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './bookshelf'

function Main (props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading" books={props.bookshelves.currentlyReading} onChangeBookshelf={props.onChangeBookshelf} />
          <Bookshelf title="Want to Read" books={props.bookshelves.wantToRead} onChangeBookshelf={props.onChangeBookshelf}/>
          <Bookshelf title="Read" books={props.bookshelves.read} onChangeBookshelf={props.onChangeBookshelf}/>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default Main
