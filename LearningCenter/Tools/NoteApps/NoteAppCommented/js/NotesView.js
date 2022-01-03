/* 
         THIS CLASS HAS THE FIRST SAY IN WHAT HAPPENS TO THE A NOTE
         IT GRABS DATA PASSED IN UPDATES THE UI BASED ON THAT DATA
         THEN RETURNS OR EXECUTES APPROPRIATE FUNCTION BASED ON HOW IT WAS CONSTRUCTED
            PAGE IS LOADED
            NOTE IS SELECTED
            NOTE IS ADDED
            NOTE IS EDITED
            NOTE IS DELETED 
*/
export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
                <!-- --SIDEBAR SECTION-- --> 
            <div class="notes__sidebar">
                    <!-- --ADD BUTTON-- --> 
                <button class="notes__add" type="button">Add Note</button>
                    <!-- --NOTE LIST CONTAINER-- --> 
                <div class="notes__list"></div>
            </div>
                <!-- --INPUT SECTION-- --> 
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body">Take Note...</textarea>
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);

    }
        // creates the html string for sidebar items 
    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;
        // maximum length of sidebar body before shortend with ...


        return `
        <div class="notes__list-item" data-note-id="${id}">
            <div class="notes__small-title">${title}</div>
            <!-- SHORTEND STRING OF THE BODY PASSED IN FROM 0 - 60 CHARS 
                 IF BODY PASSED IS GREATER THAN 60 CHARS ADD '...' --> 
            <div class="notes__small-body">${body.substring(0, MAX_BODY_LENGTH)}${body.length > MAX_BODY_LENGTH ? "..." : ""}</div>
            <!-- SKIP THE PASSED IN DATE PARAM FORMAT WITH BECAUSE OF UNDEFINED THEN
                 FORMAT DATE TO YOUR CPU's LOCAL DATE TIME FORMAT (FULL--DATE/SHORT--TIME) -->
            <div class="notes__small-updated">${updated.toLocaleString(undefined, {dateStyle: "full", timeStyle: "short"})}</div>
        </div>
        `;
    }

        // populates sidebar list with current de-serialized "notesapp-notes" key value pair
    _updateNoteList(notes) {
        // reference note list container element
        const noteListContainer = this.root.querySelector(".notes__list");

        // clear the list 
        noteListContainer.innerHTML = "";

        // generates html for each note in the de-serialized array
        for (const note of notes) {
            // loops through array and inputs appropriate data for create html function
                const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated))
                
                noteListContainer.insertAdjacentHTML("beforeend", html);
        }

        // add select/delete events for each list item now in the list
        noteListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            // SELECT NOTE
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            })

            //DELETE NOTE ON CONFIRMATION
            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    // take note passed in (clicked on from sidebar) input its tile and body to the right side of the preview so it can be seen and updated
    // remove class .notes__list-item--selected from all sidebar notes__list-items
    // take the note passed in add class .notes__list-item--selected to it changing its background color
    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }
    // IF VISIBLE IS TRUE ASSIGN A VALUE OF VISIBLE TO .notes__preview.style.visibility
    // IF VISIBLE IS FALSE ASSIGN A VALUE OF HIDDEN TO .notes__preview.style.visibility
    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}

