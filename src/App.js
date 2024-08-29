import React, { useState, useCallback, useEffect } from 'react';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [noteContent, setNoteContent] = useState('');
  const [filename, setFilename] = useState('');
  const [theme, setTheme] = useState('light');
  const [emoji, setEmoji] = useState('📝');

  const premadeNotes = [
    "Today's top goal: Make someone smile! 😊",
    "Remember to drink water and stay hydrated! 💧",
    "Idea for the weekend: Try a new recipe! 🍳",
    "Call a friend you haven't spoken to in a while. 📞",
    "Random act of kindness: Leave a nice note for someone. ❤️",
    "Learn a new word today and use it in a sentence. 📚",
    "Take a 10-minute break to stretch and relax. 🧘‍♀️",
    "Plan your next adventure, big or small! 🗺️",
    "Write down three things you're grateful for today. 🙏",
    "Set a small, achievable goal for tomorrow. 🎯"
  ];

  const handleSave = useCallback(() => {
    if (!noteContent.trim()) {
      alert('Please enter some content before saving.');
      return;
    }

    const blob = new Blob([noteContent], { type: 'text/plain;charset=utf-8' });
    const file = filename.trim() ? `${filename}.txt` : 'untitled_note.txt';
    saveAs(blob, file);
    celebrateSave();
  }, [noteContent, filename]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const changeEmoji = () => {
    const emojis = ['📝', '✏️', '🖊️', '📓', '🗒️', '📚'];
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
  };

  const shuffleNote = () => {
    const randomNote = premadeNotes[Math.floor(Math.random() * premadeNotes.length)];
    setNoteContent(randomNote);
    setEmoji('🎲');
  };

  const celebrateSave = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`container ${theme}`}>
      <h1>{emoji} Fun Note Maker {emoji}</h1>
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Type your notes here or shuffle for inspiration!"
      />
      <input
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="Enter filename (optional)"
      />
      <div className="button-group">
        <button onClick={handleSave} disabled={!noteContent.trim()} className="save-button">
          Save Note 💾
        </button>
        <button onClick={toggleTheme} className="theme-button">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button onClick={changeEmoji} className="emoji-button">
          Change Emoji
        </button>
        <button onClick={shuffleNote} className="shuffle-button">
          Shuffle 🎲
        </button>
      </div>
    </div>
  );
}

export default App;
