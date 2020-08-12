//! TO-DO LIST !//
/*
    Find a way to toggle read status
    Style new-book form

    Maaaaybe have some local and web-side persistance (and create buttons for that)
        * Side note on this web-side persistance would probably be when I get into backend
        *and find a way to factor in angular and a backend language (python or nodejs)
*/


let library = [];
let bookShelf = document.querySelector("#bookshelf");
let form = document.getElementById("add-book-form");

//Constructor and function to create book
function createBook(bookTitle = " ", bookAuthor = " ", bookPages = 0, bookRead = false){
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookPages = bookPages;
    this.bookRead = bookRead;
}


//* Event Listeners *//
document.getElementById("submit-button").addEventListener("click", addBook);
document.getElementById("clear-button").addEventListener("click", clearLibrary);
document.getElementById("add-new-book").addEventListener("click", () => form.style.display = "flex");

//* Functions *//
function renderLibrary() {
    //will reset DOM to remove all elements of the previuos library
    while (bookShelf.firstChild) {
        bookShelf.removeChild(bookShelf.firstChild);
    }
    //Create html block for DOM
    for (let i = 0; i < library.length; i++) {
        let htmlBlock = `<div class = "book" data-book = ${i}>` +
                            `<div class = book-text>` +
                                `<p class = "title"> ${library[i].bookTitle} </p>` +
                                `<p class = "author"> ${library[i].bookAuthor} </p>` +
                                `<p class = "pages"> ${library[i].bookPages} pages</p>` +
                            `</div>` +
                            `<div class = "book-form">` +
                                `<button class= "remove"> remove </button>` +
                                `<div>` +
                                    `<input type = "checkbox" class = "read"> </input>` +
                                    `<label class = "read"> read </label>` +
                                `</div>` +
                            `</div>` +
                        `</div>`;
        bookShelf.innerHTML += htmlBlock;
    }
    //Event listeners for the buttons inside the book objects
    let removeButtons = document.querySelectorAll(".remove");
        for (let buttons of removeButtons) {
            buttons.addEventListener("click", function removeBook(e){
                let bookID = e.currentTarget.parentElement.parentElement.dataset.book; //There might be a better way to do this
                library.splice(bookID, 1);                                             //But it is 4:26 am and I am tired
                renderLibrary();
            }) 

    }
    //let toggle = document.querySelectorAll(".read");
        //for (let read of toggleRead) {buttons.addEventListener("click", toggleRead)}
}

function addBook(){
    let newBookTitle = document.getElementById("book-title").value;
    let newBookAuthor = document.getElementById("book-auth").value;
    let newBookPages = document.getElementById("num-pages").value;
    let newBookRead = document.getElementById("have-read").value;
    
    if(newBookTitle != "" && newBookAuthor != "" && newBookPages != ""){
        let newBook = new createBook(newBookTitle, newBookAuthor, newBookPages, newBookRead);
        library.push(newBook);
        renderLibrary();
    }
    form.style.display = "none";
}

function clearLibrary(){
    library = [];
    renderLibrary();
}


//Fill with default values
function initializeLibrary() {
    let book1 = new createBook("Cracking the Coding Interview", "Gayle Laakman Mcdowell", 708, false);
    let book2 = new createBook("Linear Algebra Done Right", "Sheldon Axler", 340, true);
    let book3 = new createBook("The Musician's Guide to Theory and Analysis", "Clendinning and Marvin", 839, false);

    library.push(book1);
    library.push(book2);
    library.push(book3);
}

initializeLibrary();

//Just in case it wasn't rendered already
renderLibrary();