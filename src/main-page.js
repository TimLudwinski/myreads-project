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
  
  updateBooksShelf = (book, new_shelf) => {
    BooksAPI.update(book, new_shelf).then( () => {
      this.setState((prevState) => {
        if (book.shelf !== "none")
          prevState.bookshelves[book.shelf] = prevState.bookshelves[book.shelf].filter((existing_book) => book.id !== existing_book.id);
        if (new_shelf !== "none")
          prevState.bookshelves[new_shelf].push(book);
        book.shelf = new_shelf;
        
        return prevState;
      });
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
            <Bookshelf title="Currently Reading" books={this.state.bookshelves.currentlyReading} onChangeBookshelf={this.updateBooksShelf} />
            <Bookshelf title="Want to Read" books={this.state.bookshelves.wantToRead} onChangeBookshelf={this.updateBooksShelf}/>
            <Bookshelf title="Read" books={this.state.bookshelves.read} onChangeBookshelf={this.updateBooksShelf}/>
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
