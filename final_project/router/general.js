const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();




public_users.post("/register", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Task 1
// // Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   res.send(JSON.stringify(books,null,4));
// });

// Task 10
// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let bookPromise = new Promise((resolve, reject) => {
        resolve(books);
    }).then(response => {
        res.send(JSON.stringify(response,null,4));
    }).catch(res.status(404).json({ message: "No books found." }));
});

// Task 2
// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   return res.send(books[req.params.isbn]);
// });

// Task 11
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    let bookPromise = new Promise((resolve, reject) => {
        resolve(books[req.params.isbn]);
    }).then(response => {
        res.send(response);
    }).catch(res.status(404).json({ message: "ISBN number " + req.params.isbn + " not found." }));
});

// Task 3
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   booksByAuthor = {"booksbyauthor": []};
//   Object.keys(books).forEach(id => {
//     if (books[id].author == req.params.author) {
//         booksByAuthor["booksbyauthor"].push(
//             {
//                 "isbn": id,
//                 "title": books[id].title,
//                 "reviews": books[id].reviews
//             }
//         );
//     }
//   });
//   return res.send(booksByAuthor);
// });

// Task 12
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    let bookPromise = new Promise((resolve, reject) => {
        resolve(books);
    }).then(books => {
        booksByAuthor = {"booksbyauthor": []};
        Object.keys(books).forEach(id => {
        if (books[id].author == req.params.author) {
            booksByAuthor["booksbyauthor"].push(
                {
                    "isbn": id,
                    "title": books[id].title,
                    "reviews": books[id].reviews
                }
            );
        }
        });
        return res.send(booksByAuthor);
    }).catch(res.status(404).json({ message: "Author " + req.params.author + " not found." }));
});

// Task 4
// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   booksByTitle = {"booksbytitle": []};
//   Object.keys(books).forEach(id => {
//     if (books[id].title == req.params.title) {
//         booksByTitle["booksbytitle"].push(
//             {
//                 "isbn": id,
//                 "author": books[id].author,
//                 "reviews": books[id].reviews
//             }
//         );
//     }
//   });
//   return res.send(booksByTitle);
// });

// Task 13
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    let bookPromise = new Promise((resolve, reject) => {
        resolve(books);
    }).then(books => {
        booksByTitle = {"booksbytitle": []};
        Object.keys(books).forEach(id => {
            if (books[id].title == req.params.title) {
                booksByTitle["booksbytitle"].push(
                    {
                        "isbn": id,
                        "author": books[id].author,
                        "reviews": books[id].reviews
                    }
                );
            }
        });
        return res.send(booksByTitle);
    }).catch(res.status(404).json({ message: "Title " + req.params.title + " not found." }));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.send(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
