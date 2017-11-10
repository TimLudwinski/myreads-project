import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Search from './search'
import Main from './main-page'
import './App.css'

class BooksApp extends React.Component {
  render () {
    return (
      <Router>
        <div className="app">
          <Route exact path="/search" component={Search}/>
          <Route exact path="/" component={Main} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
