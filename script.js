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
  }
]

function addBookToTable () {
  const table = document.querySelector('.table')
  myLibrary.forEach((book) => {
    const tableRow = document.createElement('tr')
    table.appendChild(tableRow)
    const values = Object.values(book)
    values.forEach((value) => {
      const tableData = document.createElement('td')
      tableData.textContent = value
      table.appendChild(tableData)
    })
  })
}

function Book () {
  this.title = ''
  this.author = ''
  this.pages = 0
  this.finished = false
}

function addBookToLibrary () {
  const book = Object.create(Book)
  book.title = prompt('what is the title')
  book.author = prompt('who is the author')
  book.pages = prompt('how many pages?')
  book.finished = () => {
    const finished = prompt('have you read it', 'no')
    if (finished === 'no' || prompt === 'No') {
      return false
    } return true
  }
  myLibrary.push(book)
}
