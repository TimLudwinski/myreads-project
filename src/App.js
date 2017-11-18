import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

import Search from './search'
import Main from './main-page'
import './App.css'

class BooksApp extends React.Component {
  state = { bookshelves: { read: [], wantToRead: [], currentlyReading: [], search: [] }, booksByID: {}, searchQuery: '' }
  
  componentDidMount () {
    BooksAPI.getAll().then( (bookList) => {
      
      let newState = { bookshelves: { read: [], wantToRead: [], currentlyReading: [], search: [] }, booksByID: {} };
      bookList.forEach( (book) => { newState.bookshelves[book.shelf].push(book); } );
      bookList.forEach( (book) => { newState.booksByID[book.id] = book; } );
      this.setState(newState);
    });
  }
  
  updateBooksShelf = (book, new_shelf) => {
    BooksAPI.update(book, new_shelf).then( () => {
      this.setState((prevState) => {
        
        let old_shelf = book.shelf;
        if (!old_shelf || old_shelf === "none")
          old_shelf = "search";
        if (!new_shelf || new_shelf === "none")
          new_shelf = "search";
        
        if (old_shelf !== "search")
          prevState.bookshelves[old_shelf] = prevState.bookshelves[old_shelf].filter((existing_book) => book.id !== existing_book.id);
        prevState.bookshelves[new_shelf].push(book);
        
        if (new_shelf === "search") {
          new_shelf = "none";
          delete prevState.booksByID[book.id];
        }
        book.shelf = new_shelf;
        
        return prevState;
      });
    });
  }
  
  onChangeSearchTerms = (new_query) => {
    if (new_query.trim() === "") {
      this.setState((prevState) => {
        prevState.bookshelves.search = [];
        prevState.searchQuery = '';
        return prevState
      });
      
      return;
    }
    
    BooksAPI.search(new_query.trim()).then((books) => {
      if (books.error === "empty query")
        this.setState((prevState) => {
          prevState.bookshelves.search = [];
          prevState.searchQuery = '';
          return prevState
        });
      else
        this.setState((prevState) => {
          books.forEach((book) => {
            if (prevState.booksByID[book.id])
              book.shelf = prevState.booksByID[book.id].shelf;
            else
              book.shelf = "none";
            });
          prevState.bookshelves.search = books;
          prevState.searchQuery = new_query.trim();
          return prevState
        });
    });
  }
  
  render () {
    return (
      <Router>
        <div className="app">
          <Route exact path="/search" render={() => (<Search onChangeBookshelf={this.updateBooksShelf} searchResults={this.state.bookshelves.search} onChangeSearchTerms={this.onChangeSearchTerms}/>)} />
          <Route exact path="/" render={() => (<Main onChangeBookshelf={this.updateBooksShelf} bookshelves={this.state.bookshelves}/>) } />
        </div>
      </Router>
    )
  }
}

export default BooksApp
