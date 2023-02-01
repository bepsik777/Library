const formSubmitButton = document.querySelector('.submit')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')
const unfinished = document.querySelector('#unfinished')
const finished = document.querySelector('#finished')
const formModal = document.querySelector('.modal')
const addBookButton = document.querySelector('.add')
const closeFormButton = document.querySelector('.closeButton')

console.log(formModal)
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

// 'THIS' PROBABLY NOT WORKING
function changeStatus () {
  if (this.finished.textContent === 'finished') {
    this.finished.textContent = 'unfinished'
    this.classList.remove('finished')
    this.classList.add('unfinished')
  } else {
    this.finished.textContent = 'finished'
    this.classList.remove('unfinished')
    this.classList.add('finished')
  }
}

function addBookToLibrary () {
  const book = Object.create(Book)
  const statusButton = document.createElement('button')
  book.title = title.value
  book.author = author.value
  book.pages = pages.value
  book.finished = statusButton
  function getStatus () {
    if (unfinished.checked) {
      book.finished.textContent = unfinished.value
      book.finished.classList.add('status-button')
    } else {
      book.finished.textContent = finished.value
      book.finished.classList.add('status-button')
    }
  }
  getStatus()
  book.finished.addEventListener('click', (e) => {
    if (e.target.textContent === 'finished') {
      e.target.textContent = 'unfinished'
      e.target.classList.remove('finished')
      e.target.classList.add('unfinished')
    } else {
      e.target.textContent = 'finished'
      e.target.classList.remove('unfinished')
      e.target.classList.add('finished')
    }
  })
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
        if (typeof value !== 'object') {
          const newTableData = document.createElement('td')
          newTableData.innerHTML = value
          table.appendChild(newTableData)
        } else {
          const newTableData = document.createElement('td')
          table.appendChild(newTableData)
          newTableData.appendChild(value)
        }
      })
    }
  })
}

function hideForm () {
  formModal.classList.add('hidden')
}

function showForm () {
  formModal.classList.remove('hidden')
}

formSubmitButton.addEventListener('click', (e) => {
  e.preventDefault()
  addBookToLibrary()
  addBookToTable()
  hideForm()
})

addBookButton.addEventListener('click', showForm)
closeFormButton.addEventListener('click', hideForm)

addBookToTable()
