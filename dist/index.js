"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
pageLoader();
function pageLoader() {
    return __awaiter(this, void 0, void 0, function* () {
        const noteForm = document.getElementById('noteForm');
        noteForm === null || noteForm === void 0 ? void 0 : noteForm.addEventListener('submit', handleFormSubmit);
        let notes = yield getNotesFromAPI();
        displayNotes(notes);
    });
}
function getNotesFromAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('http://localhost:5000/notes');
        let notes = yield response.json();
        console.log(notes);
        return notes;
    });
}
function displayNotes(data) {
    // grab the notes row
    let notesRow = document.getElementById('notes');
    notesRow.innerHTML = '';
    for (let note of data) {
        // Create a column div
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';
        let noteCard = createNoteCard(note);
        col.append(noteCard);
        notesRow.append(col);
    }
}
function createNoteCard(note) {
    // Create card
    let card = document.createElement('div');
    card.className = 'card';
    // Create card body and append to card
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.append(cardBody);
    // Create the h5 header and append to card body
    let header = document.createElement('h5');
    header.className = 'card-title';
    header.innerHTML = note.body;
    cardBody.append(header);
    let timeStamp = document.createElement('p');
    timeStamp.className = 'card-text';
    timeStamp.innerHTML = note.dateCreated;
    cardBody.append(timeStamp);
    return card;
}
function handleFormSubmit(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let noteInput = document.getElementById('noteInput');
        let noteBody = noteInput.value;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/JSON');
        let data = JSON.stringify({ body: noteBody });
        let response = yield fetch('http://localhost:5000/notes', {
            method: 'POST',
            headers: myHeaders,
            body: data
        });
        let newNote = yield response.json();
        let alertSection = document.getElementById('alert');
        alertSection.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${newNote.body} has been created!</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
        let notes = yield getNotesFromAPI();
        displayNotes(notes);
        noteInput.value = '';
    });
}
