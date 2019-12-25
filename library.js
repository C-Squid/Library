//DOM definition & variable declaration

const cardContainer = document.getElementById("card-container");
const modal = document.getElementById("modal");
const close = document.getElementById("close");
const submitBtn = document.getElementById("add-book-btn")
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readRadio = document.getElementById("readRadio");
const notReadRadio = document.getElementById("not-readRadio");
const newBookBtn = document.getElementById("new-book");
const blankSlate = document.getElementById("blank-slate");

let myLibrary = [];

 //Inital event definitions

newBookBtn.addEventListener('click', () => modal.style.display = "block");
close.onclick = () => {
    modal.style.display = "none";
    clearForm();
};
window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
        clearForm();
    }
}
submitBtn.addEventListener('click', (e) =>{
    e.preventDefault(); //so the page does not auto refresh (no backend)
    //Added form validation
    if (!titleInput.value || !authorInput.value || !pagesInput.value) {
        alert("Please fill out all fields");
    } else {
        let title = titleInput.value;
        let author = authorInput.value;
        let pages = parseInt(pagesInput.value);
        let read;
        if (readRadio.checked == true) {
            read = true;
        } else {
            read = false;
        }
        addBookToLibrary(title, author, pages, read);
        modal.style.display = "none";
        clearContainer();
        clearForm();
        render();
    }
});

blankSlate.onclick = () => {
    myLibrary = [];
    clearContainer()};
//Function definitions

function clearContainer() {
    while(cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild)
    }
}

//Object constructor function
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
        return title + " by " + author + ", " + pages + " pages," + read + ".";
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function render() {
    myLibrary.forEach(book => {
        let newCard = document.createElement("div");
        newCard.className = "card";
        newCard.id = `${myLibrary.indexOf(book)}`
        
        let titleDiv = document.createElement("div");
        titleDiv.className = "book-info";
        titleDiv.innerHTML = `<h2>${book.title}</h2>`;
        
        let authorDiv = document.createElement("div");
        authorDiv.className = "book-info";
        authorDiv.innerHTML = `By: <strong>${book.author}</strong>`;
           
        let lengthDiv = document.createElement("div");
        lengthDiv.className = "book-info";
        lengthDiv.textContent = `${book.pages} pages`;

        let readDiv = document.createElement("div");
        readDiv.className = "book-info";
        let readP = document.createElement("p");
        readP.textContent = "Read?";
        let bookReadBtn = document.createElement("button");
        bookReadBtn.className ="read-button";
        bookReadBtn.textContent = "YES";
        let bookNotReadBtn = document.createElement("button");
        bookNotReadBtn.className = "read-button";
        bookNotReadBtn.textContent = "NO";

        if (book.read === true) {
            bookReadBtn.classList.add("active")
        } else if (book.read === false) {
            bookNotReadBtn.classList.add("active")
        }
        readDiv.style.display = "flex";
        readDiv.style.width = "100%";
        readDiv.style.justifyContent = "space-evenly";    
        readDiv.appendChild(readP);
        readDiv.appendChild(bookReadBtn);
        readDiv.appendChild(bookNotReadBtn);

        let removeBtn = document.createElement("button");
        removeBtn.className = "remove-button";
        removeBtn.textContent = "Remove Book";
        
        newCard.appendChild(titleDiv);
        newCard.appendChild(authorDiv);
        newCard.appendChild(lengthDiv);
        newCard.appendChild(readDiv);
        newCard.appendChild(removeBtn);
        cardContainer.appendChild(newCard);
    })
    addButtonFunc();
}


function clearForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readRadio.checked = false;
    notReadRadio.checked = true;
}

function addButtonFunc() {
    let removeBtns = Array.from(document.getElementsByClassName("remove-button"));
    removeBtns.forEach(button => {
        button.addEventListener('click', () => {
            myLibrary.splice(myLibrary[button.parentElement.id], 1);
            let moribund = document.getElementById(button.parentElement.id);
            cardContainer.removeChild(moribund);
        })
    })
    let readBtns = Array.from(document.getElementsByClassName("read-button"));
    readBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (button.className.includes("active")) {
            } else if (button.textContent == "YES") {
                let currentReadDiv = button.parentElement;
                myLibrary[currentReadDiv.parentElement.id].read = true;
            } else if (button.textContent == "NO") {
                let currentReadDiv = button.parentElement;
                myLibrary[currentReadDiv.parentElement.id].read = false;
            }
            clearContainer();
            render();
        }) 
    })
}


addBookToLibrary("Mastery", "George Leonard", 176, true);
render();