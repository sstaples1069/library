/*const authors = [
  {
    id: 0,
    name: {
      first: "Lucia",
      last: "Moreno",
    },
  },
  {
    id: 1,
    name: {
      first: "Trisha",
      last: "Mathis",
    },
  },
];
*/

function findAuthorById(authors, id) {
  let found = authors.find((author) => {
    return author.id === id;
  });
  return found;
}

function findBookById(books, id) {
  let result = books.find((book) => {
    return book.id === id;
  });
  return result;
}

function partitionBooksByBorrowedStatus(books = []) {
  //return an array with a borrowed array and an unborrowed array inside
  let borrowed = [];
  let returned = [];
  //go through each book object in array
  books.forEach((bookObj) => {
    let isBookReturned = bookObj.borrows.every((borrowsObj) => {
      return borrowsObj.returned;
    });
    if (isBookReturned === true) {
      returned.push(bookObj);
    } else {
      borrowed.push(bookObj);
    }
  });
  return [borrowed, returned];
}

function getBorrowersForBook(book = {}, accounts = []) {
  //need to be able to reference the book obj key "id"
  const { borrows } = book;
  //will return an array
  const result = borrows.map((borrower) => {
    const foundBorrower = accounts.find((account) => {
      return account.id === borrower.id;
    });
    foundBorrower.returned = borrower.returned;
    return foundBorrower;
  });
  //console.log(result);
  //return only 10 results
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
