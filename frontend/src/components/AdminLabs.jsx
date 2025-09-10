import React, { useState, useEffect } from "react";
import { FaJava, FaCloud, FaTrash, FaPlus, FaLink } from "react-icons/fa";
import { SiJavascript, SiPython } from "react-icons/si";

const AdminLabs = () => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newText, setNewText] = useState("");

  const API_BASE = "https://sir-blog-backend.onrender.com/subjects"; // Backend base URL

  const subjectLogos = {
    Java: <FaJava className="text-red-600 text-2xl" />,
    "Cloud-computing": <FaCloud className="text-blue-500 text-2xl" />,
    JavaScript: <SiJavascript className="text-yellow-500 text-2xl" />,
    Python: <SiPython className="text-green-600 text-2xl" />,
  };

  // Fetch labs on load
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const res = await fetch(`${API_BASE}/labs`);
        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLabs();
  }, []);

  const handleInput = (e) => setNewSubject(e.target.value);

  const AddSubject = async () => {
    if (!newSubject.trim()) return alert("Enter a lab name");
    try {
      const res = await fetch(`${API_BASE}/labs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSubject }),
      });
      if (!res.ok) throw new Error("Failed to add lab");
      const addedLab = await res.json();
      setSubjects([...subjects, addedLab]);
      setNewSubject("");
    } catch (err) {
      console.error(err);
      alert("Error adding lab");
    }
  };

  const DeleteSubject = async (subName) => {
    try {
      const res = await fetch(`${API_BASE}/labs/${subName}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete lab");
      setSubjects(subjects.filter((s) => s.name !== subName));
      setSubject("");
    } catch (err) {
      console.error(err);
      alert("Error deleting lab");
    }
  };

  const AddText = async () => {
    if (!subject) return alert("Select a lab first");
    if (!newText.trim()) return alert("Enter some text");
    try {
      const res = await fetch(`${API_BASE}/Lab/${subject}/text`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      if (!res.ok) throw new Error("Failed to update text");
      const updated = await res.json();
      setSubjects(subjects.map((s) => (s.name === updated.name ? updated : s)));
      setNewText("");
    } catch (err) {
      console.error(err);
      alert("Error updating text");
    }
  };

  const AddLink = async () => {
    if (!subject) return alert("Select a lab first");
    if (!newLink.trim() || !newLabel.trim()) return alert("Enter both link and label");
    try {
      const res = await fetch(`${API_BASE}/Lab/${subject}/links`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newLink, label: newLabel }),
      });
      if (!res.ok) throw new Error("Failed to add link");
      const updated = await res.json();
      setSubjects(subjects.map((s) => (s.name === updated.name ? updated : s)));
      setNewLink("");
      setNewLabel("");
    } catch (err) {
      console.error(err);
      alert("Error adding link");
    }
  };

  const DeleteLink = async (subName, url) => {
    try {
      const res = await fetch(`${API_BASE}/Lab/${subName}/links/delete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to delete link");
      const updated = await res.json();
      setSubjects(subjects.map((s) => (s.name === updated.name ? updated : s)));
    } catch (err) {
      console.error(err);
      alert("Error deleting link");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-200">
      <div className="flex justify-center items-center flex-col gap-3 bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto border border-gray-200">
        <h2 className="text-xl font-bold text-gray-700">📚 Admin Lab Panel</h2>

        <select
          className="border-2 border-gray-300 rounded p-2 text-center w-full"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option>---Select Lab---</option>
          {subjects.map((sub, index) => (
            <option key={index} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter new lab"
          value={newSubject}
          onChange={handleInput}
          className="border-2 border-gray-300 rounded p-2 w-full"
        />
        <button
          type="button"
          onClick={AddSubject}
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded w-full shadow-md"
        >
          <FaPlus /> Add Lab
        </button>

        <textarea
          placeholder="Enter text/notes for selected lab"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="border-2 border-gray-300 rounded p-2 w-full"
        />
        <button
          type="button"
          onClick={AddText}
          className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 transition text-white px-4 py-2 rounded w-full shadow-md"
        >
          📝 Add Text
        </button>

        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            placeholder="Enter link URL"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="border-2 border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Enter link label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="border-2 border-gray-300 rounded p-2"
          />
          <button
            type="button"
            onClick={AddLink}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded shadow-md"
          >
            <FaLink /> Add Link
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center items-center">
        <ul className="flex flex-col gap-4 w-full max-w-lg">
          {subjects.map((sub, index) => (
            <li
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  {subjectLogos[sub.name] || <span className="text-gray-500 text-2xl">📘</span>}
                  <span className="font-semibold text-lg text-gray-800">{sub.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => DeleteSubject(sub.name)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>

              {sub.text && <p className="mb-3 text-gray-700 bg-gray-50 p-2 rounded border">📝 {sub.text}</p>}

              {sub.links.length > 0 && (
                <ul className="flex flex-col gap-2 ml-2">
                  {sub.links.map((link, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded border hover:bg-gray-100 transition"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                      >
                        <FaLink /> {link.label}
                      </a>
                      <button
                        type="button"
                        onClick={() => DeleteLink(sub.name, link.url)}
                        className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded shadow-sm"
                      >
                        ✖
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminLabs;
