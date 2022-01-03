/* 

    THIS CLASS DECIDES WHAT AND HOW TO UPDATE THE DATA PASSED TO IT

    THEN RETURNS THE DATA IN THE FORM OF :
        DE-SERIALIZED ARRAY
        SERIALIZED ARRAY STORED IN LOCAL STORAGE
        SERIALIZED ARRAY FILTERED FOR DELETED ITEMS STORED IN LOCAL STORAGE

*/
export default class NotesApi {
    // returns a sorted..deserialized array of all notes in the "notesapp-notes" key value pair
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }
    // pushed the note passed in to the de-serialized array then over-writes the "notesapp-notes" key value pair with the updated array
    static saveNotes(noteToSave) {
        const notes = NotesApi.getAllNotes();
        /* check if the note.id passed in exist within the current array of notes */
        const existing = notes.find(note => note.id == noteToSave.id);
        /* if so change the title of the one referenced by the array.find method (existing) then change it to the values passed in by notesToSave */
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();

        } else {
            /* otherwise create a new id with current date then push it to the front of array */
            noteToSave.id = Math.floor(Math.random() * 100000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);  
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }
    // filters the de-serialized array and returns one without the note that trigger the event 
    // then over-writes the "notesapp-notes" key value pair with the filtered array
    static deleteNotes(id) {
        const notes = NotesApi.getAllNotes();

        /* return a new array of every note except the one with the id passed in */ 
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));



    }
    

}