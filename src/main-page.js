import React from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './bookshelf'

function Main () {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading"/>
          <Bookshelf title="Want to Read"/>
          <Bookshelf title="Read"/>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default Main
