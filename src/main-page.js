import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

import Bookshelf from './bookshelf'

class Main extends React.Component {
  state = { bookshelves: { read: [], wantToRead: [], currentlyReading: [] } }
  
  componentDidMount () {
    BooksAPI.getAll().then( (bookList) => {
      let newState = { bookshelves: { read: [], wantToRead: [], currentlyReading: [] } };
      bookList.forEach( (book) => { newState["bookshelves"][book.shelf].push(book) } );
      this.setState(newState);
    });
  }
  
  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf title="Currently Reading" books={this.state.bookshelves.currentlyReading}/>
            <Bookshelf title="Want to Read" books={this.state.bookshelves.wantToRead}/>
            <Bookshelf title="Read" books={this.state.bookshelves.read}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Main
