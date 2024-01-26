pageLoader();


type Note = {
    id:number,
    body:string,
    dateCreated:string
}

async function pageLoader():Promise<void>{
    let notes = await getNotesFromAPI();
    displayNotes(notes)
}

async function getNotesFromAPI(): Promise<Note[]> {
    let response = await fetch('http://localhost:5000/notes')
    let notes = await response.json()
    console.log(notes)
    return notes
}

function displayNotes(data:Note[]):void {
    // grab the notes row
    let notesRow = document.getElementById('notes') as HTMLDivElement
    notesRow.innerHTML = '';
    for (let note of data){
        // Create a column div
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'
        let noteCard = createNoteCard(note);
        col.append(noteCard)
        notesRow.append(col)
    }
}


function createNoteCard(note:Note):HTMLDivElement {
    // Create card
    let card = document.createElement('div');
    card.className = 'card'
    // Create card body and append to card
    let cardBody = document.createElement('div')
    cardBody.className = 'card-body'
    card.append(cardBody);
    // Create the h5 header and append to card body
    let header = document.createElement('h5');
    header.className = 'card-title';
    header.innerHTML = note.body;
    cardBody.append(header);
    let timeStamp = document.createElement('p');
    timeStamp.className = 'card-text';
    timeStamp.innerHTML = note.dateCreated
    cardBody.append(timeStamp)
    return card
}

