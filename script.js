const formSubmitButton = document.querySelector('.submit')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')
const unfinished = document.querySelector('#unfinished')
const finished = document.querySelector('#finished')

console.log(formSubmitButton)

const myLibrary = [
  {
    title: 'Lord of The ring',
    author: 'J.R.R. Tolkien',
    pages: 400,
    finished: 'unfinished'
  },
  {
    title: 'Hellblazer',
    author: 'Jamie Delano',
    pages: 250,
    finished: 'finished'
  },
  {
    title: 'harry potter',
    author: 'j.k. rowling',
    pages: 250,
    finished: 'finished'
  }
]

function Book () {
  this.title = ''
  this.author = ''
  this.pages = 0
  this.finished = ''
}

function addBookToLibrary () {
  const book = Object.create(Book)
  book.title = title.value
  book.author = author.value
  book.pages = pages.value
  function getStatus () {
    if (unfinished.checked) {
      book.finished = unfinished.value
    } else {
      book.finished = finished.value
    }
  }
  getStatus()
  myLibrary.push(book)
}

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
formSubmitButton.addEventListener('click', (e) => {
  e.preventDefault()
  addBookToLibrary()
  addBookToTable()
})

addBookToTable()
