import React from 'react'

import BookShelfChanger from './book-shelf-changer'

function Book (props) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: props.image }}></div>
          <BookShelfChanger />
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.author}</div>
      </div>
    </li>
  );
}

export default Book
