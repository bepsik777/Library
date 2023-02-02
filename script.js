const addBookButton = document.querySelector('.add')
const formSubmitButton = document.querySelector('.submit')
const closeFormButton = document.querySelector('.closeButton')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')
const unfinished = document.querySelector('#unfinished')
const finished = document.querySelector('#finished')
const table = document.querySelector('.table')
const formModal = document.querySelector('.modal')
const form = document.querySelector('form')
const warning = document.createElement('p')

console.log(formModal)
console.log(formSubmitButton)

const myLibrary = [
  {
    title: 'Lord of The ring',
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
  const book = Object.create(Book)
  book.title = title.value
  book.author = author.value
  book.pages = pages.value
  if (finished.checked) {
    book.finished = finished.value
  } else {
    book.finished = unfinished.value
  }
  myLibrary.push(book)
}

// function preventDuplicate () {
//   const isDuplicate = myLibrary.some(book => book.title === title.value)
//   if (isDuplicate) {
//     formSubmitButton.disabled = true
//   } else {
//     formSubmitButton.disabled = false
//   }
// }

// function addBookToTable () {
//   myLibrary.forEach((book) => {

//   })
// }

/*
1. w funkcji addBookToTable sprawić aby w komórkach z readingStatus pojawiał się guzik oraz żeby dla każdego
rzędu pojawiała się dodatkowa kolumna z przyciskiem umożliwiającym usunięcie rzędu. (napisać funkcję na nowo?)
*/

function addBookToTable () {
  myLibrary.forEach((book) => {
    const tableRows = Array.from(document.querySelectorAll('tr'))
    const isBook = tableRows.some(row => row.className === book.title)
    const newTableRow = document.createElement('tr')
    const removeTableData = document.createElement('td')
    const removeButton = document.createElement('button')
    const values = Object.values(book)
    removeButton.dataset.index = myLibrary.indexOf(book)
    newTableRow.dataset.index = myLibrary.indexOf(book)
    newTableRow.className = book.title
    removeTableData.className = 'remove-td'
    removeButton.className = 'remove-button'
    removeButton.textContent = 'delete'
    removeButton.addEventListener('click', () => {
      myLibrary.splice(removeButton.dataset.index, 1)
      removeButton.parentElement.parentElement.remove()
    })
    // check if there is no duplicated book in the table
    if (isBook === false) {
      table.appendChild(newTableRow)
      values.forEach((value) => {
        const newTableData = document.createElement('td')
        newTableData.innerHTML = value
        newTableRow.appendChild(newTableData)
      })

      removeTableData.appendChild(removeButton)
      newTableRow.appendChild(removeTableData)
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
  const isDuplicate = myLibrary.some(book => book.title === title.value)
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
