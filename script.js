const myLibrary = [
  {
    title: 'Lord of The ring',
    author: 'J.R.R. Tolkien',
    pages: 400,
    finished: 'no'
  },
  {
    title: 'Hellblazer',
    author: 'Jamie Delano',
    pages: 250,
    finished: 'no'
  },
  {
    title: 'harry potter',
    author: 'j.k. rowling',
    pages: 250,
    finished: 'no'
  }
]

function addBookToTable () {
  const table = document.querySelector('.table')
  myLibrary.forEach((book) => {
    const tableRows = Array.from(document.querySelectorAll('tr'))
    const isBook = tableRows.some(row => row.className === book.title)
    const newTableRow = document.createElement('tr')
    const values = Object.values(book)
    newTableRow.className = book.title
    table.appendChild(newTableRow)
    if (isBook === false) {
      values.forEach((value) => {
        const newTableData = document.createElement('td')
        newTableData.textContent = value
        table.appendChild(newTableData)
      })
    }
  })
}

function Book () {
  this.title = ''
  this.author = ''
  this.pages = 0
  this.finished = ''
}

function addBookToLibrary () {
  const book = Object.create(Book)
  book.title = prompt('what is the title')
  book.author = prompt('who is the author')
  book.pages = prompt('how many pages?')
  book.finished = prompt('have you finishe it?')
  myLibrary.push(book)
}
