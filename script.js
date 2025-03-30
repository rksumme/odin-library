const myLibrary = [
    {
        name: "The Hobbit",
        author: "J.R.R Tolkien",
        pages: 265,
        read: true,
        id: crypto.randomUUID()
    },
    {
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: 281,
        read: true,
        id: crypto.randomUUID()
    },
    {
        name: "1984",
        author: "George Orwell",
        pages: 328,
        read: false,
        id: crypto.randomUUID()
    },
    {
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 180,
        read: false,
        id: crypto.randomUUID()
    },
    {
        name: "My book that has a really really long title for no reason",
        author: "Me",
        pages: "17",
        read: true,
        id: crypto.randomUUID()
    },
];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}


function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

function addBookToTable(book) {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    const titleElement = document.createElement('h3');
    titleElement.textContent = book.name;

    const authorElement = document.createElement('p');
    authorElement.textContent = book.author;

    const pagesElement = document.createElement('p');
    pagesElement.textContent = `${book.pages} pages`

    const statusBtn = document.createElement('button');
    statusBtn.textContent = book.read ? 'Read' : 'Not Read';
    statusBtn.classList.add(book.read ? 'read-status' : 'not-read-status', 'status-btn');
    statusBtn.addEventListener('click', () => toggleReadStatus(book.id));

    card.append(titleElement, authorElement, pagesElement, statusBtn);

    return card;
}

function toggleReadStatus(id) {
    const bookIndex = myLibrary.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
        displayBooks();
    }
}

function displayBooks() {
    const pageBody = document.getElementById('library-container');
    pageBody.innerHTML = '';

    myLibrary.forEach(book => {
        const row = addBookToTable(book);
        pageBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayBooks();

})