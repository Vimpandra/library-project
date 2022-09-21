let myLibrary = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

const hobbit = new Book(`The Hobbit`, `Tolkien`, true);
const tomSawyer = new Book(`Tom Sawyer`, `Mark Twain`, false);

myLibrary.push(hobbit, tomSawyer);

const results = document.getElementById(`results`);

for (let i = 0; i < myLibrary.length; i++) {
    displayBooks(myLibrary[i]);
}

function displayBooks(book) {
    let card = document.createElement(`div`);
    card.classList.add(`bookCard`);

    let bookTitle = document.createElement(`h2`);
    bookTitle.textContent = book.title;
    card.appendChild(bookTitle);

    let bookAuthor = document.createElement(`p`);
    bookAuthor.textContent = book.author;
    card.appendChild(bookAuthor);

    let bookRead = document.createElement(`p`);
    bookRead.classList.add(`bookRead`);
    if (book.read) {
        bookRead.textContent = `I've already read this one`;
    } else {
        bookRead.textContent = `I'm yet to read this one`;
    };
    card.appendChild(bookRead);

    results.appendChild(card);
}


// DOM

const submitBtn = document.getElementById(`submitBtn`);
const titleInput = document.getElementById(`title`);
const authorInput = document.getElementById(`author`);
const tglBtn = document.getElementById(`tglBtn`);
const tglText = document.getElementById(`tglText`);

const addBookBtn = document.getElementById(`addBookBtn`);
const addBookWindow = document.getElementById(`addBookWindow`);

submitBtn.addEventListener(`click`, () => {
    let newBook = new Book(titleInput.value, authorInput.value, tglBtn.classList.contains(`active`));
    myLibrary.push(newBook);
    titleInput.value = null;
    titleInput.classList.remove(`filled`);
    authorInput.value = null;
    authorInput.classList.remove(`filled`);
    addBookWindow.classList.add(`hidden`);
    
    results.innerHTML = ``;
    for (let i = 0; i < myLibrary.length; i++) {
        displayBooks(myLibrary[i]);
    }
});

function checkFill(ipt) {
    if (ipt.value.length == 0) {
        ipt.classList.remove(`filled`)
    } else {
        ipt.classList.add(`filled`)
    }
};

const inputs = [titleInput, authorInput];
inputs.forEach(input => {
    input.addEventListener(`input`, () => {
        checkFill(input);
    })
});


addBookBtn.addEventListener(`click`, () => {
    addBookWindow.classList.toggle(`hidden`);
});

tglBtn.addEventListener(`click`, () => {
    tglBtn.classList.toggle(`active`);
    if (tglBtn.classList.contains(`active`)) {
        tglText.textContent = `Yes, I have`;
    } else {
        tglText.textContent = `No, not yet`
    }
});