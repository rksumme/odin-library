// Initialize Object to hold books
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
];

// Organize keys into Object items
function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// Add a new item to the existing Object
function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

// Organize the way the items are displayed on the webpage
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

    //  Create a delete button that removes an item from the Object
    const deleteElement = document.createElement('button');
    deleteElement.textContent = "Delete";
    deleteElement.classList.add('delete');
    deleteElement.addEventListener('click', () => deleteBook(book.id));

    // Create a read status button that changes when clicked
    const statusBtn = document.createElement('button');
    statusBtn.textContent = book.read ? 'Read' : 'Not Read';
    statusBtn.classList.add(book.read ? 'read-status' : 'not-read-status', 'status-btn');
    statusBtn.addEventListener('click', () => toggleReadStatus(book.id));

    // Create the card containing the above elements
    card.append(titleElement, authorElement, pagesElement, statusBtn, deleteElement);

    return card;
}

// Function that changes the read status of a book when called
function toggleReadStatus(id) {
    // Identifies book by unique ID
    let bookIndex = myLibrary.findIndex(book => book.id === id);
    // If book exists
    if (bookIndex !== -1) {
        // Changes read value to the opposite of its current state
        myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
        // Refresh the display
        displayBooks();
    }
}

// Deletes an item from the Object when called using unique ID
function deleteBook(id) {
    const confirmDelete = confirm("Are you sure?");

    if (confirmDelete) {
        bookIndex = myLibrary.findIndex(book => book.id === id);
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
            displayBooks();
    }
    }
}

// Refreshes the display and shows each item in the Object as a card
function displayBooks() {
    const pageBody = document.getElementById('library-container');
    // Sets pageBody to only display what is appended to it
    pageBody.innerHTML = '';

    myLibrary.forEach(book => {
        const row = addBookToTable(book);
        pageBody.appendChild(row);
    });
}

// Accepts input from a form and stores them as variables
function handleFormSubmission(event) {
    event.preventDefault();

    const bookName = document.getElementById('title').value.trim();
    const bookAuthor = document.getElementById('author').value.trim();
    const bookPages = parseInt(document.getElementById('pages').value);
    const bookRead = document.getElementById('read').checked;

    // Adds item to Object using form inputs
    addBookToLibrary(bookName, bookAuthor, bookPages, bookRead);

    // Refreshes display
    displayBooks();

    // Resets input boxes in form
    document.getElementById('new-book-form').reset();
}

// Initializes display on load
document.addEventListener('DOMContentLoaded', function() {
    displayBooks();

    // Initializes new card when submit button is clicked
    const bookForm = document.getElementById('new-book-form');
    if (bookForm) {
        bookForm.addEventListener('submit', handleFormSubmission)
    }
})