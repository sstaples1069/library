const accounts = [
  {
    id: "5f446f2ecfaf0310387c9603",
    picture: "https://api.adorable.io/avatars/75/esther.tucker@zillacon.me",
    age: 25,
    name: {
      first: "Esther",
      last: "Tucker",
    },
    company: "ZILLACON",
    email: "esther.tucker@zillacon.me",
    registered: "Thursday, May 28, 2015 2:51 PM",
  },
  {
    id: "5f446f2ed46724f41c9fc431",
    picture: "https://api.adorable.io/avatars/75/ferrell.morris@ecolight.com",
    age: 35,
    name: {
      first: "Ferrell",
      last: "Morris",
    },
    company: "ECOLIGHT",
    email: "ferrell.morris@ecolight.com",
    registered: "Thursday, February 8, 2018 1:16 PM",
  },
];

function findAccountById(accounts, id) {
  let result = accounts.find((account) => {
    return account.id === id;
  });
  return result;
}

function sortAccountsByLastName(accounts) {
  let result = accounts.sort((accountA, accountB) => {
    return accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase()
      ? 1
      : -1;
  });
  return result;
}

/*
function getTotalNumberOfBorrows(account = {}, books = []) {
  //getting an account obj and array of all book objs
  const { id } = account;
  let totalCount = 0;
  let borrowedCount = 0;
  //count how many times account id appears in all book borrows and return total
  books.forEach((currentBook) => {
    const {borrows} = currentBook;
    borrows.forEach((borrower) => {
      if(borrower.id === id) {
        borrowedCount++;
      }
    })
    totalCount += borrowedCount;
  })
  return totalCount;
  //need to go through books array (forEach) and look at each borrows.id === account id (destructure)
}  why did this code return 6 with an expected of 2 for idx 0 of account objs
*/

function getTotalNumberOfBorrows(account = {}, books = []) {
  const { id } = account;
  const totalCount = books.reduce((acc, currentBook) => {
    const { borrows } = currentBook;
    borrows.forEach((borrower) => {
      if (borrower.id === id) {
        acc++;
      }
    });
    return acc;
  }, 0);
  return totalCount;
}

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  //getting an account obj and array of all book objs and array of all author objs
  //return an array of all book objs including author info currently checked out by account id
  //will have to find borrows similar to previous function
  const { id } = account;
  let result = [];
  books.forEach((bookObj) => {
    const { borrows, authorId } = bookObj;
    borrows.forEach((borrower) => {
      //have to match borrower id
      if (borrower.id === id) {
        //where borrows:returned === false, means that book is possessed
        if (borrower.returned === false) {
          const bookAuthor = authors.find((author) => {
            return author.id === authorId;
          });
          bookObj.author = bookAuthor;
          result.push(bookObj);
        }
      }
    });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
