const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Ensure axios is imported if you are making internal HTTP requests, or use local promise logic to simulate it as per your lab manual instructions

// Task 10: Get the list of books available in the shop using Promise callbacks
public_users.get('/', function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    if (books) {
      resolve(books);
    } else {
      reject("No books found");
    }
  });

  getBooks
    .then((bookList) => {
      res.status(200).send(JSON.stringify(bookList, null, 4));
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// Task 11: Get book details based on ISBN using Promise callbacks
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  const getBookByISBN = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });

  getBookByISBN
    .then((book) => {
      res.status(200).send(JSON.stringify(book, null, 4));
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});
  
// Task 12: Get book details based on author using Promise callbacks
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  
  const getBooksByAuthor = new Promise((resolve, reject) => {
    const filteredBooks = [];
    Object.keys(books).forEach((key) => {
      if (books[key].author.toLowerCase() === author.toLowerCase()) {
        filteredBooks.push({ isbn: key, ...books[key] });
      }
    });
    if (filteredBooks.length > 0) {
      resolve(filteredBooks);
    } else {
      reject("No books found by this author");
    }
  });

  getBooksByAuthor
    .then((bookList) => {
      res.status(200).send(JSON.stringify(bookList, null, 4));
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// Task 13: Get all books based on title using Promise callbacks
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  
  const getBooksByTitle = new Promise((resolve, reject) => {
    const filteredBooks = [];
    Object.keys(books).forEach((key) => {
      if (books[key].title.toLowerCase() === title.toLowerCase()) {
        filteredBooks.push({ isbn: key, ...books[key] });
      }
    });
    if (filteredBooks.length > 0) {
      resolve(filteredBooks);
    } else {
      reject("No books found with this title");
    }
  });

  getBooksByTitle
    .then((bookList) => {
      res.status(200).send(JSON.stringify(bookList, null, 4));
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

module.exports = public_users;
