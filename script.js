const addBookButton = document.querySelector('.add')
const formSubmitButton = document.querySelector('.submit')
const closeFormButton = document.querySelector('.closeButton')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')
const table = document.querySelector('.table')
const formModal = document.querySelector('.modal')
const form = document.querySelector('form')
const warning = document.createElement('p')
const removeButtonArray = []

const myLibrary = [
  {
    title: 'Lord Of The ring',
    author: 'J.R.R. Tolkien',
    pages: 400,
    finished: 'finished'
  },
  {
    title: 'Hellblazer',
    author: 'Jamie Delano',
    pages: 250,
    finished: 'unfinished'
  },
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    pages: 250,
    finished: 'finished'
  }
]

function Book (title, author, pages, status) {
  this.title = title
  this.author = author
  this.pages = pages
  this.finished = status
}

function addBookToLibrary () {
  const bookTitle = title.value
  const bookAuthor = author.value
  const bookPages = pages.value
  const bookStatus = document.querySelector('input[name="status"]:checked').value
  const book = new Book(bookTitle, bookAuthor, bookPages, bookStatus)
  myLibrary.push(book)
}

function addBookToTable () {
  myLibrary.forEach((book) => {
    const tableRows = Array.from(document.querySelectorAll('tr'))
    const isBook = tableRows.some(row => row.className === book.title)
    if (isBook === false) {
      const newTableRow = document.createElement('tr')
      const removeTableData = document.createElement('td')
      const removeButton = document.createElement('button')
      removeButtonArray.push(removeButton)
      const statusButton = document.createElement('button')
      statusButton.className = 'status-button'
      const values = Object.values(book)

      removeButton.dataset.index = removeButtonArray.indexOf(removeButton)
      console.log(removeButton.dataset.index)
      newTableRow.className = book.title
      removeTableData.className = 'remove-td'
      removeButton.className = 'remove-button'
      removeButton.textContent = 'Remove'

      // Button that removes book from library and from the table
      removeButton.addEventListener('click', () => {
        myLibrary.splice(removeButton.dataset.index, 1)
        removeButtonArray.splice(removeButton.dataset.index, 1)
        console.log(myLibrary)
        console.log(removeButtonArray)
        removeButton.parentElement.parentElement.remove()
        updateRemoveButtonDataset()
      })

      // add functionality to status button: change the status in the book object and text content of the button
      statusButton.addEventListener('click', () => {
        if (book.finished === 'finished') {
          book.finished = 'unfinished'
          statusButton.textContent = book.finished
          statusButton.classList.remove('finished-button')
        } else if (book.finished === 'unfinished') {
          book.finished = 'finished'
          statusButton.textContent = book.finished
          statusButton.classList.add('finished-button')
        }
      })

      // check if there is no duplicated book in the table

      table.appendChild(newTableRow)
      values.forEach((value) => {
        const newTableData = document.createElement('td')
        newTableData.className = value
        newTableData.innerHTML = value
        newTableRow.appendChild(newTableData)
        if (newTableData.className === 'finished' || newTableData.className === 'unfinished') {
          newTableData.innerHTML = ''
          newTableData.appendChild(statusButton)
          statusButton.textContent = value
        }
      })
      removeTableData.appendChild(removeButtonArray[removeButton.dataset.index])
      newTableRow.appendChild(removeTableData)

      // Add Styling to the default books in myLibrary
      myLibrary.forEach(book => {
        if (statusButton.textContent === 'finished') statusButton.classList.add('finished-button')
      })
    }
  })
}

function updateRemoveButtonDataset () {
  removeButtonArray.forEach(button => {
    button.dataset.index = removeButtonArray.indexOf(button)
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
  const isDuplicate = myLibrary.some(book => book.title === title.value)
  // check for duplicates. if they are any, disable submit button and show a warning
  if (isDuplicate) {
    warning.className = 'duplicate-warning'
    warning.textContent = 'There is already a book with the same title in the library'
    form.appendChild(warning)
    return
  }
  warning.remove()
  addBookToLibrary()
  addBookToTable()
  hideForm()
})

addBookButton.addEventListener('click', showForm)
closeFormButton.addEventListener('click', hideForm)
closeFormButton.addEventListener('click', () => {
  warning.remove()
})

addBookToTable()
