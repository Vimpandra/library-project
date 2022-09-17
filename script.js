let myLibrary = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
}

const hobbit = new Book(`The Hobbit`, `Tolkien`);
const tomSawyer = new Book(`Tom Sawyer`, `Mark Twain`);

myLibrary.push(hobbit, tomSawyer);

const results = document.getElementById(`results`);

function displayBooks(book) {
    let card = document.createElement(`div`);
    card.classList.add(`bookCard`);

    let bookTitle = document.createElement(`h2`);
    bookTitle.textContent = book.title;
    card.appendChild(bookTitle);

    let bookAuthor = document.createElement(`p`);
    bookAuthor.textContent = book.author;
    card.appendChild(bookAuthor);

    results.appendChild(card);
}


// DOM

const submitBtn = document.getElementById(`submitBtn`);
const titleInput = document.getElementById(`title`);
const authorInput = document.getElementById(`author`);

submitBtn.addEventListener(`click`, () => {
    let newBook = new Book(titleInput.value, authorInput.value);
    myLibrary.push(newBook);
    titleInput.value = null;
    titleInput.classList.remove(`filled`);
    authorInput.value = null;
    authorInput.classList.remove(`filled`);


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

