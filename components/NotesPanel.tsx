"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

interface NotesPanelProps {
  selectedDate: Date | null;
}

export default function NotesPanel({ selectedDate }: NotesPanelProps) {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState("");

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setCurrentNote(dateKey ? notes[dateKey] || "" : "");
  }, [dateKey, notes]);

  const handleSave = () => {
    if (!dateKey) return;
    const updated = { ...notes, [dateKey]: currentNote };
    setNotes(updated);
    localStorage.setItem("calendar-notes", JSON.stringify(updated));
  };

  if (!selectedDate) return <div className="p-6 text-gray-400 italic">Select a date to write notes.</div>;

  return (
    <div className="p-6 flex flex-col h-full bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-tighter">
        Notes: {format(selectedDate, "MMM do, yyyy")}
      </h3>
     <textarea
  className="flex-grow w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-gray-900 bg-white"
  value={currentNote}
  onChange={(e) => setCurrentNote(e.target.value)}
  placeholder="Add a memo..."
/>
      <button onClick={handleSave} className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
        SAVE NOTE
      </button>
    </div>
  );
}