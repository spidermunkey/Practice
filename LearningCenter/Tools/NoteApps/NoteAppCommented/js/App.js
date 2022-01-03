import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js"

export default class App {
    constructor(root) {
        // stores reference to current list of notes
        this.notes = [];
        // stores reference to active note
        this.activeNote = null;
        // include Notes View Class with the root passed in its constructor
        // calls the hanler private function which returns and object for {
                /* 
                    onNoteSelect
                    onNoteAdd
                    onNoteEdit
                    onNoteDelete
                */
        //  }
        // then constructs the Notes View class with those handlers returned in the object
        this.view = new NotesView(root, this._handlers())

        // calls the private method that updates the note list
        this._refreshNotes();
    }

    _refreshNotes() {
        // calls the notes api to get the de-serialized -- sorted array
        const notes = NotesAPI.getAllNotes()

        // calls the private setNotes method with sorted array
        this._setNotes(notes);

        // if there is more than one note then we will set the active note to the first one in the array
        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    // calls the User Interface to update whats visible based on the notes in the api
    _setNotes(notes) {
        // sets this classes reference of notes in the list to the notes that were passed in
        this.notes = notes;

        // calls the UI method that populates the sidebar with the notes passed in
        this.view._updateNoteList(notes);

        // if there is more than one note in the array passed in is sets the visibility flag to true
        // which returns notes__preview.style.visibility = "visible"
        this.view.updateNotePreviewVisibility(notes.length > 0);

    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note)
    }
    // just an object that stores functions
    _handlers() {
        return {
            // key    val   args 
            onNoteSelect: noteId => {
                // called when a .note__list-item is selected 
                    // grabs the selected note -- data-id="(noteId passed in)"
                        /* 
                            noteListItem.addEventListener("click", () => {
                                this.onNoteSelect(noteListItem.dataset.noteId);
                        */
                // based on the noteId passed in
                // find it in the array of this.notes and set it to selectedNote 
                const selectedNote = this.notes.find(note => note.id == noteId)

                // call the setActiveNote Method that calls
               //                            |
                    /*                       V
                        updateActiveNote(selectedNote) {
                            this.root.querySelector(".notes__title").value = note.title;
                            this.root.querySelector(".notes__body").value = note.body;

                            this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
                                noteListItem.classList.remove("notes__list-item--selected");
                            });

                            this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
                        }
                    */
                this._setActiveNote(selectedNote);
                // updates the notes preview title & body with the data in the selectedNote Found
                
            }, 
            onNoteAdd: () => {
                const newNote = {
                    // default title & body when note is created
                    title: "New Note",
                    body: "Take note..."
                } 
                    // when the add button is clicked
                // creates a new note template preview 
                // creates a new note sidebar template
                NotesAPI.saveNotes(newNote);

                    /*
                        static saveNotes(noteToSave) {
                                const notes = NotesApi.getAllNotes();
                                // check if the note.id passed in exist within the current array of notes 
                                const existing = notes.find(note => note.id == noteToSave.id);
                                // if so change the title of the one referenced by the array.find method (existing) then change it to the values passed in by notesToSave 
                                if (existing) {
                                    existing.title = noteToSave.title;
                                    existing.body = noteToSave.body;
                                    existing.updated = new Date().toISOString();

                                } else {
                                    // otherwise create a new id with current date then push it to the front of array 
                                    noteToSave.id = Math.floor(Math.random() * 100000);
                                    noteToSave.updated = new Date().toISOString();
                                    notes.push(noteToSave);  
                                }

                                localStorage.setItem("notesapp-notes", JSON.stringify(notes));
                            }

                    */        
                this._refreshNotes();
                    // updates the sidebar with the newly set array 
                    // by calling the ui with view.updateNoteList(notes)
            }, 
            onNoteEdit: (title, body) => {
                // called whenever the blur event is triggered on either input
                /*
                     [inpTitle, inpBody].forEach(inputField => {
                         
                                            inputField.addEventListener("blur", () => {
                
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();
                                                
                                    |              |
                                    V              V
                this.onNoteEdit(updatedTitle, updatedBody);
            });
                */
                NotesAPI.saveNotes({
                // requires an existing id to save note (by using notes.find(id))
                // or it will create a new one!
                    /* 
                        static saveNotes(noteToSave) {
                                const notes = NotesApi.getAllNotes();
                                // check if the note.id passed in exist within the current array of notes 
                                const existing = notes.find(note => note.id == noteToSave.id);
                                // if so change the title of the one referenced by the array.find method (existing) then change it to the values passed in by notesToSave 
                                if (existing) {
                                    existing.title = noteToSave.title;
                                    existing.body = noteToSave.body;
                                    existing.updated = new Date().toISOString();
                    */
                // grab this.activeNote set by onNoteSelect
                    id: this.activeNote.id,
                    title, // pass updated title to save notes ("existing.title = title passed in(from blurred input")
                    body // pass updated body to save notes  ("existing.body = body passed in(from blurred input")
                    // save notes calls arr.find then manipulates the index found and calls localStorage.setItem
                });
                // updates the ui after array has been manipulated!
                this._refreshNotes()
            }, 
            onNoteDelete: noteId => {
                // called by the note__list-item / double click event
                // uses .note__list-item data-id="(id passed in)" as a refrence
                NotesAPI.deleteNotes(noteId);
                // then passes that reference to
                    /*
                        static deleteNotes(id) {
                            const notes = NotesApi.getAllNotes();

                            // return a new array of every note except the one with the id passed in  
                            const newNotes = notes.filter(note => note.id != id);

                            localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
                    */
                this._refreshNotes();
                /*
                    noteListItem.addEventListener("dblclick", () => {
                        const doDelete = confirm("Are you sure you want to delete this note?");

                    if (doDelete) {
                        this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
                */
            }, 
        }
    }
}