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
    bookAuthor.classList.add(`bookAuthor`);
    bookAuthor.textContent = book.author;
    card.appendChild(bookAuthor);

    let controlPanel = document.createElement(`div`);
    controlPanel.classList.add(`controlPanel`);

    let readInfo = document.createElement(`div`);
    readInfo.classList.add(`readInfo`);

    let readIcon = document.createElement(`div`);
    readIcon.classList.add(`readIcon`);
    if (book.read) {
        readIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`;
    } else {
        readIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z" /></svg>`;
    }
    readInfo.appendChild(readIcon);

    let bookRead = document.createElement(`p`);
    bookRead.classList.add(`bookRead`);
    if (book.read) {
        bookRead.textContent = `I've read this`;
    } else {
        bookRead.textContent = `Not yet read`;
    };
    readInfo.appendChild(bookRead);

    let deleteBtn = document.createElement(`div`);
    deleteBtn.classList.add(`deleteBtn`);
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;
    
    controlPanel.appendChild(readInfo);
    controlPanel.appendChild(deleteBtn);

    card.appendChild(controlPanel);
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
    tglBtn.classList.remove(`active`);
    tglText.textContent = `No, not yet`;
    addBookWindow.classList.add(`hidden`);
    
    results.innerHTML = null;

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