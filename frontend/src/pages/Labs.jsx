import React, { useState, useEffect } from "react";

const Labs = () => {
  const [labsData, setLabsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch labs from backend
    fetch("https://sir-blog-backend.onrender.com/subjects/labs") // Replace with your backend URL
      .then((res) => res.json())
      .then((data) => {
        const formatted = {};
        data.forEach((sub) => {
          formatted[sub.name] = [];

          // Add text if available
          if (sub.text) {
            formatted[sub.name].push({ id: "text", type: "text", text: sub.text });
          }

          // Add links if available
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

        setLabsData(formatted);
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
        <p className="text-xl text-gray-500 animate-pulse">Loading lab content...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 via-white to-green-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">💻 Lab PDFs & Notes</h1>

      {Object.keys(labsData).length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No lab content available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(labsData).map(([subject, contents]) => (
            <div
              key={subject}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b-2 border-green-200 pb-2">
                {subject}
              </h2>

              <ul className="flex flex-col gap-3">
                {contents.map((content) => (
                  <li key={content.id} className="bg-green-50 rounded p-3 hover:bg-green-100 transition">
                    {content.type === "text" && <p className="text-gray-700">{content.text}</p>}
                    {content.type === "link" && (
                      <a
                        href={content.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 font-medium underline"
                      >
                        🔗 {content.title}
                      </a>
                    )}
                    {content.type === "image" && (
                      <img
                        src={content.url}
                        alt={content.title}
                        className="inline-block mt-2 w-20 h-20 object-cover rounded"
                      />
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

export default Labs;
