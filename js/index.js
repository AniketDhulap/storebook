showBooks();

function trash(){
  localStorage.clear();
  showBooks();
  }

function bookObj(bookName, authorName, type) {
  this.book = bookName;
  this.author = authorName;
  this.type = type;
}

function Display() {
}

function deleteBtn(index){
  let allBooks =localStorage.getItem('allBooks');
  if (allBooks == null) {
    bookObject = [];
  } else {
    bookObject = JSON.parse(allBooks);
  }
  bookObject.splice(index,1);
  localStorage.setItem('allBooks', JSON.stringify(bookObject));
  showBooks();

  let deleteMessage = document.getElementById('deleteMessage');
  deleteMessage.innerHTML = `! Deleted Book Successfully !`;
  deleteMessage.style.padding = "1.5rem";
  deleteMessage.style.backgroundColor = "#FFE9E9";
  deleteMessage.style.color = "#77444f";
  deleteMessage.style.fontSize = "1.6rem";

  setTimeout(() => {
    deleteMessage.innerHTML = "";
    deleteMessage.style.padding = "0rem";
  }, 2000);

}

function showBooks() {
  let allBooks =localStorage.getItem('allBooks');
  if (allBooks == null) {
    bookObject = [];
  } else {
    bookObject = JSON.parse(allBooks);
  }
  let html = "";
  Array.from(bookObject).forEach((e,index)=>{
    html += `        <tr>
                            <td>${e.book}</td>
                            <td>${e.author}</td>
                            <td>${e.type}</td>
                            <td><button class="btn btn-primary deleteButton" onclick="deleteBtn(${index})">Delete</button></td>
                          </tr>`;
  });

  let bookTable = document.getElementById('uiString');
  if(allBooks == null) {
    bookTable.innerHTML =`<p class="nothingNote">Nothing To show here</p>`;
  } else {
    bookTable.innerHTML =html;
  }

} 

Display.prototype.add = function (Books) {

  //without store in localStorage

  //   let uiString = `        <tr>
  //   <td>${Books.book}</td>
  //   <td>${Books.author}</td>
  //   <td>${Books.type}</td>
  // </tr>`;
  // let bookTable = document.getElementById('uiString');
  // bookTable.innerHTML += uiString;

  //with local Storage

  let allBooks = localStorage.getItem('allBooks');
  if (allBooks == null) {
    bookObject = [];
  } else {
    bookObject = JSON.parse(allBooks);
  }
  bookObject.unshift(Books);
  localStorage.setItem('allBooks', JSON.stringify(bookObject));

  showBooks();

}




Display.prototype.clear = function () {
  let formBox = document.getElementById('formBox');
  formBox.reset();
}
Display.prototype.validate = function (Books) {
  if (Books.book.length >= 2 && Books.author.length >= 2) {
    return true;
  } else {
    return false;
  }

}
Display.prototype.show = function (type, displayMessage) {
  let typeValue = type;
  let msg;
  if (typeValue == "success") {
    msg = "Successfully";
  } else {
    msg = "Error";
  }
  let messageBox = document.getElementById('messageBox');
  messageBox.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${msg}</strong> ${displayMessage}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  messageBox.style.fontSize = "1.3rem";


  setTimeout(() => {
    messageBox.innerHTML = "";
  }, 3000);


}

let addBook = document.getElementById('addBook');
addBook.addEventListener('click', (e) => {
  e.preventDefault();

  let bookName = document.getElementById('bookName').value;
  let authorName = document.getElementById('authorName').value;
  let type;

  let shareMarket = document.getElementById('shareMarket');
  let programming = document.getElementById('programming');
  let psychology = document.getElementById('psychology');
  let other = document.getElementById('other');

  
  if (shareMarket.checked) {
    type = shareMarket.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (psychology.checked) {
    type = psychology.value;
  }
  else if (other.checked) {
    type = other.value;
  }
  else{
    type = "Not Selected";
  }
  
  
  let Books = new bookObj(bookName, authorName, type);
  let display = new Display();
  if (display.validate(Books)) {

    display.show("success", "added book in your library");
    display.add(Books);
    display.clear();


  } else {
    display.show("danger", "Please enter Book name And Author name");

  }


});
