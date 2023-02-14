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

/*goes in after line: const { id } 
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
*/
function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  //getting an account obj and array of all book objs and array of all author objs
  //return an array of all book objs including author info currently checked out by account id
  //will have to find borrows similar to previous function
  const { id } = account;
  const result = books.filter((bookObj) => {
    const { borrows, authorId } = bookObj;
    const doesAccountPossess = borrows.some((borrower) => {
      //need to also check if returned
      if (borrower.returned === false) {
        return borrower.id === id;
        }
    });
    if (doesAccountPossess === true) {
        const matchingAuthor = authors.find((author) => {
        return author.id === authorId
      });
      bookObj.author = matchingAuthor;
      return bookObj;
    }
  });
  //console.log(result);
  return result;
}

//git push -u origin main
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
