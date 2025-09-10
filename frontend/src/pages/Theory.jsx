import React, { useState, useEffect } from "react";

const Theory = () => {
  const [theoryData, setTheoryData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sir-blog-backend.onrender.com/subjects/theory")
      .then((res) => res.json())
      .then((data) => {
        const formatted = {};
        data.forEach((sub) => {
          formatted[sub.name] = [];

          if (sub.text) {
            formatted[sub.name].push({ id: "text", type: "text", text: sub.text });
          }

          if (sub.links && sub.links.length > 0) {
            sub.links.forEach((link, idx) => {
              formatted[sub.name].push({
                id: `link-${idx}`,
                type: "link",
                title: link.label,
                url: link.url,
              });
            });
          }
        });

        setTheoryData(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500 animate-pulse">Loading theory content...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">📚 Theory PDFs & Notes</h1>

      {Object.keys(theoryData).length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No theory content available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(theoryData).map(([subject, contents]) => (
            <div
              key={subject}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-2">
                {subject}
              </h2>

              <ul className="flex flex-col gap-3">
                {contents.map((content) => (
                  <li key={content.id} className="bg-indigo-50 rounded p-3 hover:bg-indigo-100 transition">
                    {content.type === "text" && <p className="text-gray-700">{content.text}</p>}
                    {content.type === "link" && (
                      <a
                        href={content.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                      >
                        🔗 {content.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Theory;
