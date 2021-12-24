console.log('DevNotes | Notes for use of Dev.Prabhat');

// JQUERY Section
$(document).ready(function () {
    $(".burger").click(() => {
        $("#navUl").toggleClass("show");
        // console.log("clicked")
        if ($("#navUl").hasClass("show")) {
            // console.log('haS SHOW');
            $(".searchNav").addClass("vis");
            $(".burgerOpen").addClass("dn");
            $(".closeburger").removeClass("dn");
        }
        else {
            $(".searchNav").removeClass("vis");
            $(".closeburger").addClass("dn");
            $(".burgerOpen").removeClass("dn");
        }
    });
});


// Grab All The requirements
let add = document.getElementById("AddBtn");
let Done = document.getElementsByClassName("doneBtn");
let Edit = document.getElementsByClassName("EditBtn");
let clear = document.getElementById("cleanBtn");
let NoteTit = document.getElementById("NoteInp");
let NoteDesc = document.getElementById("NoteDesc");
let searchNav = document.getElementById("searchNav")


// ADDING EVENT LISTENER ON BUTTONS
add.addEventListener("click", addNoteToUI);
clear.addEventListener('click', clearNoteFromUI);

searchNav.addEventListener("input",searchNote)
// CREATING FUNCTION WHICH WILL RUN WITHIN EVENT LISTENER

// Function to add Notes to UI
function addNoteToUI() {
    // console.log('Adding Notes To The UI');
    console.log("note title is :", NoteTit.value, "And", "Note desc is :", NoteDesc.value)
    let Notes = {
        title: NoteTit.value,
        description: NoteDesc.value
    }
    let localNotes = localStorage.getItem("notes");
    if (localNotes == null) {
        NotesObj = []
    }
    else {
        NotesObj = JSON.parse(localNotes);
    }
    NotesObj.push(Notes);
    localStorage.setItem("notes", JSON.stringify(NotesObj));
    NoteTit.value = "";
    NoteDesc.value = "";

    showNotesToUI();
}
function showNotesToUI() {
    let localNotes = localStorage.getItem("notes");
    if (localNotes == null) {
        NotesObj = []
    }
    else {
        NotesObj = JSON.parse(localNotes);
    }
    let noteCard = "";
    NotesObj.forEach((element, index) => {
        noteCard += `
        <div class="card">
        <h1 class="title" id="title">${element.title}</h1>
        <p class="desc" id="desc">${element.description}</p>
        <div class="cardBtns">
        <input type="button" value="Done!" class="btn doneBtn" id="${index}" onclick="DoneTask(this.id)">
        <input type="button" value="Edit" class="btn EditBtn" id="${index}" onclick="DoneTask(this.id)" >
        </div>
        </div>
        `
    })
    let cardContainer = document.getElementById("cards")
    if (NotesObj.length != 0) {
        cardContainer.innerHTML = noteCard;
    }
    else {
        cardContainer.innerHTML = "No More Notes Here Add Your Notes Here"
    }
}

// Function to remove notes from UI
function clearNoteFromUI() {
    console.log('Cleared Notes From UI');
    let config = confirm("Are You Sure ?")
    if (config == true) {
        localStorage.clear();
        showNotesToUI()
    }
}

// Function to Done Task
function DoneTask(i) {
    let localNotes = localStorage.getItem("notes");
    if (localNotes == null) {
        NotesObj = []
    }
    else {
        NotesObj = JSON.parse(localNotes);
    }

    NotesObj.splice(i, 1)
    localStorage.setItem("notes", JSON.stringify(NotesObj));
    showNotesToUI();
    // console.log('done task');
}

// Function for editing the existing note
function EditNote() {
    console.log('editing Your existing Note');
}

// FUNCTION for Searching Notes
function searchNote(){
    console.log('searching Your Note');
    let searchVal = searchNav.value.toLowerCase();
    console.log(searchVal)
    let noteCards = document.getElementsByClassName("card");
    // console.log(noteCards[0])
    Array.from(noteCards).forEach((element)=>{
        let txt = element.getElementsByTagName('h1')[0].innerText.toLowerCase();
        if(txt.includes(searchVal)){
            element.style.display = "block"
        }
        else
        {
            element.style.display = "none"
        }
    })
}
showNotesToUI();