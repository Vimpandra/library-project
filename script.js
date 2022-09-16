let myLibrary = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
}

function addBookToLibrary() {

}


const hobbit = new Book(`The Hobbit`, `Tolkien`);
const tomSawyer = new Book(`Tom Sawyer`, `Mark Twain`);

myLibrary.push(hobbit, tomSawyer);
console.log(myLibrary);

// DOM

const submitBtn = document.getElementById(`submitBtn`);
const titleInput = document.getElementById(`title`);
const authorInput = document.getElementById(`author`);

submitBtn.addEventListener(`click`, () => {
    let newBook = new Book(titleInput.value, authorInput.value);
    myLibrary.push(newBook);
    titleInput.value = ``;
    authorInput.value = ``;

    console.log(myLibrary);
});