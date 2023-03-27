/* Object constructor */

let myLibrary = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

/* Sample Objects */

const hobbit = new Book(`The Hobbit`, `Tolkien`, true);
const tomSawyer = new Book(`Tom Sawyer`, `Mark Twain`, false);

myLibrary.push(hobbit, tomSawyer);

/* DOM Elements */

const results = document.getElementById(`results`);
const submitBtn = document.getElementById(`submitBtn`);
const titleInput = document.getElementById(`title`);
const authorInput = document.getElementById(`author`);
const tglBtn = document.getElementById(`tglBtn`);
const tglText = document.getElementById(`tglText`);
const addBookBtn = document.getElementById(`addBookBtn`);
const addBookWindow = document.getElementById(`addBookWindow`);

for (let i = 0; i < myLibrary.length; i++) {
    displayBooks(myLibrary[i], i);
}

submitBtn.addEventListener(`click`, () => {
    if (titleInput.validity.valid && authorInput.validity.valid) {
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
            displayBooks(myLibrary[i], i);
        }
    } else {
        alert(`You need to provide a book title and author name to submit`);
    }
});

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

/* Core Functions */

function checkFill(ipt) {
    if (ipt.value.length == 0) {
        ipt.classList.remove(`filled`)
    } else {
        ipt.classList.add(`filled`)
    }
};

function displayBooks(book, i) {
    let card = document.createElement(`div`);
    card.classList.add(`bookCard`);
    card.dataset.indexNum = i;

    let bookTitle = document.createElement(`h2`);
    bookTitle.textContent = book.title;
    card.appendChild(bookTitle);

    let bookAuthor = document.createElement(`p`);
    bookAuthor.classList.add(`bookAuthor`);
    bookAuthor.textContent = `by ${book.author}`;
    card.appendChild(bookAuthor);

    let controlPanel = document.createElement(`div`);
    controlPanel.classList.add(`controlPanel`);

    let readInfo = document.createElement(`div`);
    readInfo.classList.add(`readInfo`);

    let readIcon = document.createElement(`div`);
    readIcon.classList.add(`readIcon`);
    if (book.read) {
        readIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`;
        readInfo.style.cssText = `background-color: var(--affirmative-color);`;
    } else {
        readIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z" /></svg>`;
        readInfo.style.cssText = `background-color: var(--accent-color); cursor: pointer;`;
        readInfo.addEventListener(`click`, () => { 
            myLibrary[i].read = confirm(`Have you finished reading ${myLibrary[i].title} by ${myLibrary[i].author}?`);
            results.innerHTML = null;
            for (let i = 0; i < myLibrary.length; i++) {
                displayBooks(myLibrary[i], i);
            }
        });
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
    deleteBtn.addEventListener(`click`, () => {
        if(confirm(`Are you sure you want to delete ${myLibrary[i].title} by ${myLibrary[i].author} from your library?`)) {
            myLibrary.splice(i, 1);
            results.innerHTML = null;
            for (let i = 0; i < myLibrary.length; i++) {
                displayBooks(myLibrary[i], i);
            }
        }
        });

    controlPanel.appendChild(readInfo);
    controlPanel.appendChild(deleteBtn);

    card.appendChild(controlPanel);
    results.appendChild(card);
}