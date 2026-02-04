const STORAGE_KEY = "obsidian_notes";

function getNotes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function createNote(title) {
  const notes = getNotes();
  const id = Date.now().toString();
  notes.push({ id, title, content: "" });
  saveNotes(notes);
  return id;
}

function updateNote(id, title, content) {
  const notes = getNotes();
  const note = notes.find(n => n.id === id);
  if (!note) return;
  note.title = title;
  note.content = content;
  saveNotes(notes);
}

function getNoteById(id) {
  return getNotes().find(n => n.id === id);
}