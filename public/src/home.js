function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

function getBooksBorrowedCount(books = []) {
  let borrowedCount = books.reduce((acc, book) => {
    const { borrows } = book;
    let hasEveryoneReturned = borrows.every((borrower) => {
      return borrower.returned === true;
    })
    if(hasEveryoneReturned === false) {
      acc++;
    }
    return acc;
  }, 0);
  return borrowedCount;
}

const getMostCommonGenres = (books = []) => {
  let result = [];
  books.forEach((bookObj) => {
    const { genre } = bookObj;
    //check if genre already in array
    let listed = result.find(obj => {
      return obj.name === genre;
    })
    //if genre is not there
    if(listed === undefined) {
      //add the genre and count to array as on obj
      let newBookObj = {name: genre, count: 1};
      result.push(newBookObj);
    //or if genre was already in array  
    } else {
      //increase the genre count
      listed.count++;
    }
  })
  result.sort((genreA, genreB) => (genreB.count > genreA.count ? 1 : -1));
  //console.log(result.slice(0, 5));
  return result.slice(0, 5);
}

function getMostPopularBooks(books = []) {
  let result = [];
  books.forEach((bookObj) => {
    //what do i need to look at from each object: title, borrows
    const { title, borrows } = bookObj;
    //create the obj with the required format
    let listed = { name: title, count: borrows.length}
      //push to the array
      result.push(listed);
    })
  result.sort((bookA, bookB) => (bookB.count > bookA.count ? 1 : -1));
  //console.log(result.slice(0, 5));
  return result.slice(0, 5);
}

function findAuthorById(authors, id) {
  let found = authors.find((author) => {
    return author.id === id;
  });
  return found;
}

function getMostPopularAuthors(books = [], authors = []) {
  //create array to return
  const result = [];
  //run through books to get author id's and each books count
  books.forEach(book => {
    const {authorId, borrows} = book
    //get author by ID
    const matchingAuthor = findAuthorById(authors, authorId); //use of helper
    //function here but had to re-write function from books.js, there's a way
    //to reference between files in same program?
    //can i use similar code from getMostPopularBooks to quickly grab counts?
    const { name: { first, last } } = matchingAuthor
    const displayName = `${first} ${last}`;

    let listed = result.find(obj => {
      return obj.name === displayName;
      //RIGHT HERE** listed is always being returned as undefined 
    })
    if (listed === undefined) {
      let obj = {name: displayName, count: borrows.length};
      result.push(obj);
    } else {
      listed.count += borrows.length;
    }
  })
  result.sort((authorA, authorB) => (authorB.count > authorA.count ? 1 : -1));
  //console.log(result/*.slice(0, 5)*/);
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
