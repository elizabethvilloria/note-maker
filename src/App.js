import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
  const [noteContent, setNoteContent] = useState('');
  const [filename, setFilename] = useState('');

  const handleSave = () => {
    const blob = new Blob([noteContent], { type: 'text/plain;charset=utf-8' });
    const file = filename.trim() ? `${filename}.txt` : 'untitled_note.txt';
    saveAs(blob, file);
  };

  return (
    <div className="container">
      <h1>Note Maker</h1>
      <textarea
        id="noteArea"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Type your notes here..."
      />
      <input
        type="text"
        id="filename"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="Enter filename"
      />
      <button onClick={handleSave}>Save Note</button>
    </div>
  );
}

export default App;
