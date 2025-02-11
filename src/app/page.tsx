'use client';

import { useEffect, useRef, useState } from "react";

export default function CodePreview() {
  const iframeRef = useRef(null);
  const [code, setCode] = useState(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
      </style>
    </head>
    <body class="bg-gray-50">
      <div id="root"></div>
      <script type="text/babel">
        const { useState } = React;
        
        function EditableText({ text, onChange, isEditing }) {
          const [value, setValue] = useState(text);
          
          return isEditing ? (
            <input 
              className="border border-gray-400 p-1 rounded"
              type="text" 
              value={value} 
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => onChange(value)}
              autoFocus
            />
          ) : (
            <span>{value}</span>
          );
        }
        
        function Home({ navigate, isEditing }) {
          const [title, setTitle] = useState("AI Tools Startup");
          const [headline, setHeadline] = useState("Revolutionizing AI for Businesses");
          const [description, setDescription] = useState("Our cutting-edge AI solutions help automate tasks, improve efficiency, and drive innovation.");
          
          return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
              <header className="w-full bg-blue-600 text-white py-6 shadow-md">
                <h1 className="text-4xl font-bold">
                  <EditableText text={title} onChange={setTitle} isEditing={isEditing} />
                </h1>
              </header>
              <main className="p-8 max-w-4xl">
                <h2 className="text-3xl font-semibold text-gray-800">
                  <EditableText text={headline} onChange={setHeadline} isEditing={isEditing} />
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  <EditableText text={description} onChange={setDescription} isEditing={isEditing} />
                </p>
                <button 
                  className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => navigate('about')}
                >
                  Learn More
                </button>
              </main>
            </div>
          );
        }

        function About({ navigate, isEditing }) {
          const [aboutTitle, setAboutTitle] = useState("About Us");
          const [whoWeAre, setWhoWeAre] = useState("Who We Are");
          const [aboutDescription, setAboutDescription] = useState("We are a team of AI enthusiasts dedicated to building intelligent solutions for businesses worldwide.");
          
          return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
              <header className="w-full bg-blue-600 text-white py-6 shadow-md">
                <h1 className="text-4xl font-bold">
                  <EditableText text={aboutTitle} onChange={setAboutTitle} isEditing={isEditing} />
                </h1>
              </header>
              <main className="p-8 max-w-4xl">
                <h2 className="text-3xl font-semibold text-gray-800">
                  <EditableText text={whoWeAre} onChange={setWhoWeAre} isEditing={isEditing} />
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  <EditableText text={aboutDescription} onChange={setAboutDescription} isEditing={isEditing} />
                </p>
                <button 
                  className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => navigate('home')}
                >
                  Back to Home
                </button>
              </main>
            </div>
          );
        }

        function App() {
          const [page, setPage] = useState('home');
          const [isEditing, setIsEditing] = useState(false);
          
          const navigate = (newPage) => setPage(newPage);
          
          return (
            <div>
              <button 
                className="absolute top-4 right-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
              {page === 'home' && <Home navigate={navigate} isEditing={isEditing} />}
              {page === 'about' && <About navigate={navigate} isEditing={isEditing} />}
            </div>
          );
        }
        
        ReactDOM.render(<App />, document.getElementById("root"));
      </script>
    </body>
    </html>
  `);

  useEffect(() => {
    const iframe = iframeRef.current as any;
    if (iframe) {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(code);
      iframeDoc.close();
    }
  }, [code]);

  return (
    <div className="flex h-screen">
      <textarea
        className="w-1/2 h-full p-4 border-r border-gray-300 text-sm font-mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="w-1/2 h-full border-l border-gray-300">
        <iframe ref={iframeRef} className="w-full h-full" />
      </div>
    </div>
  );
}
